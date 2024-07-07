const express = require('express')
const router = express.Router();
const expenseController = require('../controllers/studentexpenses')

router.get('/home',expenseController.getHome)
router.get('/fetchExpense',expenseController.fetchDetails)
router.put('/editExpense/:id',expenseController.editExpense)
router.post('/expense',expenseController.postExpense)
router.delete('/deleteExpense/:id',expenseController.deleteExpense)


module.exports = router