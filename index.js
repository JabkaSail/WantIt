var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var morgan = require('morgan');
var session = require('express-session');
var wishController = require('./controllers/wishController.js');
var groupController = require('./controllers/groupController.js');
var usersController = require('./controllers/usersController.js');
//var auhtorizationController = require('./controllers/autorisationController.js')
app.set('view engine', 'ejs'); 
var cookieParser = require('cookie-parser');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: 'popkaPlusJopkadjhKPPйFj', 
              saveUninitialized: true,
                  resave: true }));
            

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ApoD_rasStRELny',
 //password : 'password',
  database : 'WantIt'
 });

app.get('/', function(req, res){
    if (req.session.User != null){
        res.redirect('/groups')
    }
    else{
           res.redirect('/login');
      }
     });
   
       


//auhtorizationController(app);
usersController(app);
groupController(app);
wishController(app);

 console.log('Сервер стартовал!');
app.listen(8080);