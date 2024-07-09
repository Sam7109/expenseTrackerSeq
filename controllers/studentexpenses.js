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

exports.editExpense = async(req,res) => {
    try{
        const {id} = req.params
        const{amount,description,category} = req.body
        const updatedExpense = {}

        if(amount){
            updatedExpense.amount = amount
        }
        if(description){
            updatedExpense.description = description
        }
        if(category){
            updatedExpense.category = category
        }
           const expense = await Expense.findOne({where:{id:id}})

           if(expense){
             await Expense.update(updatedExpense,{where:{id:id}})
             const newExpense = await Expense.findOne({where:{id:id}})
             return res.status(200).json({'data':newExpense})
           }
           else{
            return res.status(400).json({error:'id not found'})
           }

    }
    catch(err){
        res.status(500).json({err})
    }
}

exports.deleteExpense = async(req,res) => {
    try{
        const {id} = req.params 
        const expense = await Expense.findOne({where:{id : id}})
        if(expense){
            await Expense.destroy({where:{id:id}})
            return res.status(200).json({message:'Expense deleted successfully',expense})
        }
        else {
            return res.status(400).json({error : 'details missing'})
        }

    }
    catch(error){
            res.status(500).json({err:error})
    }
}




