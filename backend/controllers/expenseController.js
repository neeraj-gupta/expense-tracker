const Expense = require('../models/Expense');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.createExpense = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { amount, category, date } = req.body;
        if (!amount || !category || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const expense = new Expense({
            amount,
            category,
            date,
            user: req.user.id,
        });
        await expense.save();
        res.status(201).json({ message: 'Expense created successfully', expense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllExpenses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const expenses = await Expense.find({ user: req.user.id });
        res.status(200).json({ message: 'Expenses fetched successfully', expenses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { amount, date } = req.body;
        const expense = await Expense.updateOne(
            { _id: req.params.id },
            { $set: { amount, date } },
            { new: true }
        );
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense updated successfully', expense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
