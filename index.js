const express = require('express');
const app = express();
const path = require('path');
const loginRoutes = require('./routes/loginRoutes')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', loginRoutes);
app.use('/static', express.static(path.join(__dirname, 'public')));

app.listen(4000, ()=>{
    console.log("server starts")
});
