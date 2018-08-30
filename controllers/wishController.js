var data = [{item: 'get milk'}, {item: 'walk dog'}]
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mysql = require('mysql');

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
 // password : 'ApoD_rasStRELny',
 password : 'password',
  database : 'WantIt'
 });



module.exports = function(app){
   con.connect(function(err) {
     app.get('/wishes/', function(req, res){
         
          con.query("SELECT * FROM `WishesDb` WHERE `Group` = ?", [req.session.GroupName], function (err, rows, result) {
        if (err) throw err;
        var popa = JSON.parse(JSON.stringify(rows));
        res.render('wishes', {group: req.session.GroupName, data: popa, user: req.session.User});
        });
      });
     app.post('/wishes', urlencodedParser, function(req, res){
         var wish = (req.body.AddWish).replace(/\r?\n/g, "");
        var values = {
        Wish: wish,
        Group: req.session.GroupName,
        User: req.session.User
    }
     if (wish == ""){
          var values = {
        Wish: "Nope",
        Group: req.session.GroupName,
        User: req.session.User
    }
     }
   con.query("INSERT INTO WishesDb SET ?", values, function (err, rows, fields) {
              if (err) throw err;
            });
          res.redirect('/wishes/');
     });
     
     //app.delete('/wishes/delete/:wish', function(req, res){
        
    // });
     app.get('/wishes/delete/:wish', function(req, res){
          con.query("DELETE FROM `WishesDb` WHERE `Group` = ? AND `Wish` = ?", [req.session.GroupName, req.params.wish], function (err, rows, result) {
        if (err) throw err;
          res.redirect('/wishes/');
        });
     }); 
       
            app.get('/wishes/select/:wish', function(req, res){
                var val = {
                    Wid: req.session.User
                            }
          con.query("UPDATE `WishesDb` SET ? WHERE `Group` = ? AND `Wish` = ?", [val, req.session.GroupName, req.params.wish], function (err, rows, result) {
        if (err) throw err;
          res.redirect('/wishes/');
        });
     });   
       
           app.get('/wishes/unselect/:wish', function(req, res){
                var val = {
                    Wid: 0
                            }
          con.query("UPDATE `WishesDb` SET ? WHERE `Group` = ? AND `Wish` = ?", [val, req.session.GroupName, req.params.wish], function (err, rows, result) {
        if (err) throw err;
         res.redirect('/wishes/');
        });
     });   
       
     });
 };
                      