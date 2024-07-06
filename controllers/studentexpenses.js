const Expense = require('../model/expense')
const path = require('path')

exports.getHome = (req,res)=>{
    res.sendFile(path.join(__dirname,'../views/expenseTracker.html'))
}


exports.fetchDetails = async (req,res)=>{
    try{
        const result = await Expense.findAll() 
        return res.status(200).json({Details : result})
    }
    catch(err){
        return res.status(400).json({error : err.message})
    }
}


exports.postExpense = async (req,res) =>{
    try{
        const {amount,description,category} = req.body
        const data = await Expense.create({
            amount : amount ,
            description : description,
            category : category
        })

         return res.status(200).json({Data:data})
        
    }
    catch(error){
           return  res.status(500).json({error : error.message})
    }
}