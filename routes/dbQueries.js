var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// mysql database server
var meshdb = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});
meshdb.connect(function(err){
if (!err) {
    console.log("Database is connected ...");
} else {
    console.log("Error connecting database ...");
}
});

router.get('/getContacts', function(req, res, next) {
	meshdb.query("select * from people where lname = 'Mino' ", function(err, rows, fields) {
		if (!err) {
			return res.json(rows);
		}
		else
			return next(new Error('Error while performing Query. ['+ err +']'));
		});
	
});

router.get('/getContactById/:id', function(req, res, next) {
	var id = req.param('id');
	meshdb.query("select * from people where id = " + id, function(err, rows, fields) {
		if (!err) {
			return res.json(rows);
		}
		else
			return next(new Error('Error while performing Query. ['+ err +']'));
		});
	
});

module.exports = router;
