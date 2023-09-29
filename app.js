const fs = require('fs');
const path = require('path')
const express = require('express');

const app = express();


//Timeplate enjine tell express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
//check for static file
app.use(express.static('public'));
//parse incoming request. for post
app.use(express.urlencoded({extended: false}));


//html
app.get('/', function(req, res){
    res.render('index');
});
app.get('/items', function(req, res){
    res.render('items');
});
app.get('/menu', function(req, res){
    res.render('menu')
});
app.get('/cusRecom', function(req, res){
    res.render('cusRecom')
});



app.post("/store-user", function(req, res){
    const userName = req.body.username;

    const filePath = path.join(__dirname, 'data', 'users.json');

    const fileData = fs.readFileSync(filePath)
    const existingUsers = JSON.parse(fileData)

    existingUsers.push(userName)

    fs.writeFileSync(filePath, JSON.stringify(existingUsers))
    res.send('<h1> UserName Stored</h1>');
})

app.get('/users', function(req, res){
    const filePath = path.join(__dirname, 'data', 'users.json');

    const fileData = fs.readFileSync(filePath)
    const existingUsers = JSON.parse(fileData)

    let responseData = '<ul>'

    for(const user of existingUsers){
        responseData += '<li>' + user + "</li>";
    }
    responseData += '</ul>';
    res.send(responseData)
});

app.listen(3000);