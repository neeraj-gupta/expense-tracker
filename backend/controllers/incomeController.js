const Income = require('../models/Income');
const User = require('../models/User');

const xlsx = require('xlsx');

exports.getAllIncome = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const incomes = await Income.find({ user: user._id }).sort({ date: -1 });
        res.status(200).json({
            message: 'Incomes fetched successfully',
            incomes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

exports.addIncome = async (req, res) => {
    try {
        const { amount, source, date } = req.body;
        if (!amount || !source || !date) {
            return res.status(400).json({
                message: 'Please fill all fields'
            });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const income = await Income.create({
            amount,
            source,
            date,
            user: user._id
        });

        res.status(201).json({
            message: 'Income added successfully',
            income
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

exports.downloadIncomeToExcel = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const incomes = await Income.find({ user: user._id });
        // Prepare data for Excel export
        const incomeData = incomes.map(income => ({
            Date: income.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
            Source: income.source,
            Amount: income.amount,
        }));

        // Export to Excel logic here
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(incomeData);
        xlsx.utils.book_append_sheet(wb, ws, 'Incomes');
        xlsx.writeFile(wb, 'incomes.xlsx');

        res.download('income.xlsx');
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

exports.deleteIncome = async (req, res) => {
    try {
        const income = await Income.findByIdAndDelete(req.params.id);
        if (!income) {
            return res.status(404).json({
                message: 'Income not found'
            });
        }
        res.status(200).json({
            message: 'Income deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}