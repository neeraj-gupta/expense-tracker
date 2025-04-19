const express = require('express');
const {
    createExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense
} = require('../controllers/expenseController');
const { authenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authenticated, createExpense);
router.get('/all', authenticated, getAllExpenses);
router.put('/update/:id', authenticated, updateExpense);
router.delete('/:id', authenticated, deleteExpense);

module.exports = router;