var express = require('express');
var app = express();

app.use(express.static('public'));

/*app.get('/',function (req,res) {
	res.sendFile('index.html');
});*/

app.listen('4000',function(){
	console.log('app is running at port 4000');
});