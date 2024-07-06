// const Sequelize = require('sequelize')
// const sequelize = require('../sequelize/db')

// const Expense = sequelize.define('expensetracker',{
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
 
//      amount : {
//         type : Sequelize.INTEGER,

//      } ,

//      description : {
//         type : Sequelize.STRING,
//      } ,

//      category : {
//         type : Sequelize.STRING,
//      }

// })

// module.exports = Expense ;
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelize/db');

const Expense = sequelize.define('expensetracker', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false // Ensuring the amount field is not null
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false // Ensuring the description field is not null
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false // Ensuring the category field is not null
    }
}, {
    tableName: 'expensetracker'
});

module.exports = Expense;
