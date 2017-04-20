var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cool = require('cool-ascii-faces');
var config = require("./config");

var app = express();

app.use('/', express.static(path.join(__dirname, '/client')));
// app.use(express.static(path.join(__dirname, 'assets')));
app.use('/modules', express.static(path.join(__dirname, '/node_modules')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var dbConnection = mysql.createConnection({
// 	host:'localhost' || 'us-cdbr-east-04.cleardb.com',
// 	user: 'root' ||'beeca702b5929e',
// 	password: '' || "dceaa008",
// 	database: 'DiaryNotes' || 'heroku_b1744734a5527da',
// 	socketPath: '/tmp/mysql.sock',
// 	port : 3306
//
// });
//
//dbConnection.connect();

var db_config = {
	host:'us-cdbr-iron-east-03.cleardb.net',
	user: 'bf4ab44c1b29c7',
	password: "8516876a",
	database: 'heroku_feefe01914f3eb6'
};


var connection;

function handleDisconnect() {
    console.log('1. connecting to db:');
    connection = mysql.createConnection(db_config); // Recreate the connection, since the old one cannot be reused.

    connection.connect(function(err) {              	// The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('2. error when connecting to db:', err);
            setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
        }                                     	// to avoid a hot loop, and to allow our node script to
    });                                     	// process asynchronous requests in the meantime.
    											// If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('3. db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { 	// Connection to the MySQL server is usually
            handleDisconnect();                      	// lost due to either server restart, or a
        } else {                                      	// connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();


app.post('/takeNote', function(request, response) {
	var params = [request.body.note.titleArea, request.body.note.textArea,request.body.note.date];
	var queryString = 'INSERT INTO Note (EntryTitle, EntryText, YMD) values (?, ?, ?)';
     //console.log(request.body.note.titleArea, request.body.note.date);
	 connection.query(queryString, params, function(err,rows,fields) {
		response.json(rows);
	});

});

app.post('/rendernotes', function(request, response) {
    var queryString = `select * From Note where YMD="${request.body.date}"`;
   console.log('queryString', queryString);
    connection.query(queryString, function(err, results, fields) {
    	if(err) console.log(err);
   	   response.send(results);
    });
});

//for testing heroku run local web
app.get('/cool', function(request, response) {
	response.send(cool());
});


app.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
