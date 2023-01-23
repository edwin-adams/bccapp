//Check if we are running in the right environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}



const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')
const Sequelize = require('sequelize')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout','layouts/layout')
app.use(expressLayouts);
app.use(express.static('public'));

//Database connection using sequelize
const sequelize = new Sequelize('procurement', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

//Test the connection
sequelize.authenticate().then(() => { 
    console.log('Connection has been established successfully.');
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});


app.use('/', indexRouter);

app.listen(process.env.PORT || 3000)
