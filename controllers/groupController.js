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
    //GET Req
   con.connect(function(err) {
         app.get('/groups', function(req, res){
                if (req.session.User != null){
          console.log(req.session.User + " group");
          con.query("SELECT * FROM `GroupsDb` WHERE `User` = ?", [req.session.User], function (err, rows, result) {
        if (err) throw err;
              var popa = JSON.parse(JSON.stringify(rows));
                con.query("SELECT * FROM `UserDb` WHERE `User` = ?", [req.session.User], function (err, rows, result) {
               console.log(rows);
        var popas = JSON.parse(JSON.stringify(rows));
                    if (popa[0] == null){
                        req.session.Group = 'none'
                    }
                    else {
                    req.session.Group = popas[0].group;
                        }
        res.render('groups', {data: popa, user: req.session.User, selected: popas[0].group });
        });
                    });
                    } else{
                       res.redirect('/login');
      }
     });  
     
     //POST Req  
       
     app.post('/groups', urlencodedParser, function(req, res){
            if (req.session.User != null){
    var Group = (req.body.AddWish).replace(/\r?\n/g, "");
        var values = {
        Name: Group,
        User: req.session.User,
        Author: req.session.User
    }
     if (Group == ""){
     next();
     }
            con.query("SELECT * FROM `GroupsDb` WHERE `Name` = ?", [Group], function (err, rows, result) {
        if (err) throw err;
                 var values = {
        Name: Group,
        User: req.session.User,
        Author: req.session.User
    }
        var popa = JSON.parse(JSON.stringify(rows));
     if (popa[0] == undefined) {
       
   con.query("INSERT INTO GroupsDb SET ?", values, function (err, rows, fields) {
              if (err) throw err;
            });
                
          res.redirect('/groups');
                }
                else{
                       var values = {
        Name: popa[0].Name ,
        User: req.session.User,
        Author: popa[0].Author
    }
       con.query("INSERT INTO GroupsDb SET ?", values, function (err, rows, fields) {
           if (err) throw err;
            res.redirect('/groups');
           });
                }
     });
        } else{
                       res.redirect('/login');
      }
     }); 
       //GET DELETE Req  
       
      app.get('/delete/:group', function(req, res){
          if (req.session.User != null){
          con.query("DELETE FROM `GroupsDb` WHERE `Name` = ? AND `Author` = ?", [req.params.group, req.session.User], function (err, rows, result) {
        if (err) throw err;
         res.redirect('/groups');
              });
                    }
                    
                    else{
                       res.redirect('/login');
                    }
        });
    
       
        //GET SELECT Req  
       
        app.get('/select/:group', function(req, res){
             if (req.session.User != null){
            var value = {
                group: req.params.group
            }
            req.session.Group = req.params.group;
          con.query("UPDATE `UserDb` SET ? WHERE User = ?", [value, req.session.User], function (err, rows, result) {
        if (err) throw err;
        
        res.redirect('/groups');
               });
                } 
    else{
                       res.redirect('/login');
      }
       
     });
       
      });
 };
        
   