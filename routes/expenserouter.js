const express = require('express')
const router = express.Router();
const expenseController = require('../controllers/studentexpenses')

router.get('/',)
router.get('/fetchExpense',expenseController.fetchDetails)
router.post('/expense',expenseController.postExpense)


module.exports = router