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

var dbConnection = mysql.createConnection({
	host:'localhost' || 'us-cdbr-east-04.cleardb.com',
	user: 'root' ||'beeca702b5929e',
	password: '' ||"dceaa008",
	database: 'DiaryNotes' || 'heroku_b1744734a5527da',
	socketPath: '/tmp/mysql.sock',
	port : 3306

});

dbConnection.connect();



app.post('/takeNote', function(request, response) {
	var params = [request.body.note.titleArea, request.body.note.textArea,request.body.note.date];
	var queryString = 'INSERT INTO Note (EntryTitle, EntryText, YMD) values (?, ?, ?)';
     //console.log(request.body.note.titleArea, request.body.note.date);
	 dbConnection.query(queryString, params, function(err,rows,fields) {
		response.json(rows);
	});

});

app.post('/rendernotes', function(request, response) {
    var queryString = `select * From Note where YMD="${request.body.date}"`;
   console.log('queryString', queryString);
    dbConnection.query(queryString, function(err, results, fields) {
    	if(err) console.log(err);
   	   response.send(results);
    });
});

app.get('/cool', function(request, response) {
	response.send(cool());
})


// aoppc.listen(config.port,function(){
// console.log(` server listening on port *:${config.port}`);
// });

app.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
