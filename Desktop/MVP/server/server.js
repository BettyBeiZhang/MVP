var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

app.use('/', express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/modules', express.static(path.join(__dirname, '../node_modules')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var dbConnection = mysql.createConnection({
	user: 'root',
	password: '',
	database:'DiaryNotes'
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
	console.log('the date', request.body);
   //var queryString = 'select * From note where YMD = "' + request.body.note.date + '"'; 
    var queryString = `select * From Note where YMD="${request.body.date}"`; 
   console.log('queryString', queryString);
    dbConnection.query(queryString, function(err, results, fields) {
    	if(err) console.log(err);
   	   response.send(results);
    });

});


var port = 8080;


app.listen(port);
console.log('Listening to port:' + port); 