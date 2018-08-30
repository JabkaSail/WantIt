var data = [{item: 'get milk'}, {item: 'walk dog'}]
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mysql = require('mysql');
var cookieParser = require('cookie-parser');

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
 // password : 'ApoD_rasStRELny',
 password : 'password',
  database : 'WantIt'
 });



module.exports = function(app){
   
    
     
 };
        
   

