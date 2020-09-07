const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res,next)=> {
    res.render('admin.ejs');
})
app.listen(3000, console.log('Started listening'));