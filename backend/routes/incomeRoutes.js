const express = require('express');

const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeToExcel,
} = require('../controllers/incomeController');
const { authenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authenticated, addIncome);
router.get('/all', authenticated, getAllIncome);
router.get('/download-excel', authenticated, downloadIncomeToExcel);
router.delete('/:id', authenticated, deleteIncome);

module.exports = router;