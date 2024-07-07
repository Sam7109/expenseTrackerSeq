const sequelize = require('./model/expense')
const bodyParser = require('body-parser')

const expenseController = require('./controllers/studentexpenses')
const expenseRouter = require('./routes/expenserouter')

const express = require('express')
const app = express()


app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.use(express.json());

// app.use('/',expenseController.)
//app.use('/studentExpense',expenseRouter) 
app.use('/',expenseRouter)


const port = 2000

sequelize.sync()
.then(() => {
    app.listen(port,() => {
            console.log(`Running on ${port}`)
    })
})


