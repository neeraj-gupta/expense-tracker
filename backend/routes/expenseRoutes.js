const express = require('express');
const {
    createExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense
} = require('../controllers/expenseController.js');
const { authenticated } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/add', authenticated, createExpense);
router.get('/all', authenticated, getAllExpenses);
router.put('/update/:id', authenticated, updateExpense);
router.delete('/:id', authenticated, deleteExpense);

module.exports = router;