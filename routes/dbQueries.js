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

router.get('/getRecent', function(req, res, next) {
	meshdb.query("select * from people where lname = 'Mino' ", function(err, rows, fields) {
		if (err)
			return next(new Error('Error while performing Query. ['+ err +']'));
		else
			return res.json(rows);
	});
	
});

router.get('/getFavs', function(req, res, next) {
	meshdb.query("select * from people where tags LIKE '%LAK%' ", function(err, rows, fields) {
		if (err)
			return next(new Error('Error while performing Query. ['+ err +']'));
		if (rows.length == 0)
			return next(new Error('Could not find any contacts marked as a favorite.'));
		else
			return res.json(rows);
	});
});

router.get('/getContactById/:id', function(req, res, next) {
	var id = req.params.id;
	meshdb.query("select * from people where id = " + id, function(err, person, fields) {
		if (err)
			return next(new Error('Error while looking up contact. ['+ err +']'));
		if (person.length == 0)
			return next(new Error('Could not find a contact with an id of ['+id+'].'));
		else {
			var pid = person[0].pid;
			meshdb.query("select type, info, concat(timezone, ' ', state, ' ', cities) as areacode from pinfo left join kbase.areacodes ON acode = if(substr(type,2,2)='ph',if(substr(info,1,1)='(', substr(info,2,3),substr(info,1,3)),'') where pid = " + pid, function(err, details, fields) {
				if (err)
					return next(new Error('Error looking up contact details. ['+ err +']'));
				else {
					return res.json({person: person[0], details: details});
				}
			});
		}
	});
});

/*
 * Very weak 'query' interpretation here. This will likely contain much more logic
 * to parse the incoming 'query' prevent injection and overall be more useful.
 *
 */
router.post('/getCustomResults', function(req, res, next) {
    var query = req.body.query;
    meshdb.query("select * from people where " + query, function(err, rows, fields) {
        if (err) {
        	// This is piped into an alert via the angular controller.
            return next(new Error(err.code + ' while performing query.'));
        } else {
			return res.json(rows);
		}
	});
});

module.exports = router;
