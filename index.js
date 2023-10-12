const express = require('express');
const app = express();
const path = require('path');

const loginRoutes = require('./routes/loginRoutes')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/', loginRoutes)

app.listen(4000, ()=>{
    console.log("server starts")
})