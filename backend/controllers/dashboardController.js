const Expense = require('../models/Expense');
const Income = require('../models/Income');
const User = require('../models/User');

const {
    Types
} = require('mongoose');

exports.getDashboardData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const userId = req.user.id;
        const UserObjectId = new Types.ObjectId(userId);

        // Get all income for the user
        const totalIncome = await Income.aggregate([{
                $match: {
                    user: UserObjectId
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: '$amount'
                    }
                }
            }
        ]);

        // Get all expenses for the user
        const totalExpenses = await Expense.aggregate([{
                $match: {
                    user: UserObjectId
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: '$amount'
                    }
                }
            }
        ]);

        // Get income transactions for the user in last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            user: UserObjectId,
            date: {
                $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
            }
        }).sort({
            date: -1
        });

        // Income last 60 days transactions
        const last60DaysIncome = last60DaysIncomeTransactions.reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0);

        // Get expense transactions for the user in last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            user: UserObjectId,
            date: {
                $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
        }).sort({
            date: -1
        });

        // Expense last 30 days transactions
        const last30DaysExpense = last30DaysExpenseTransactions.reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0);

        // fetch last 5 transactions for income and expense
        const last5Transactions = [
            ...(await Income.find({ user: UserObjectId }).sort({ date: -1 }).limit(5)).map(
                (transaction) => ({
                    type: 'income',
                    ...transaction.toObject()
                })
            ),
            ...(await Expense.find({ user: UserObjectId }).sort({ date: -1 }).limit(5)).map(
                (transaction) => ({
                    type: 'expense',
                    ...transaction.toObject
                })
            ),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpenses[0]?.total || 0,
            last30Daysexpenses: {
                total: last30DaysExpense,
                transactions: last30DaysExpenseTransactions
            },
            last60DaysIncome: {
                total: last60DaysIncome,
                transactions: last60DaysIncomeTransactions
            },
            recentTransactions: last5Transactions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
};