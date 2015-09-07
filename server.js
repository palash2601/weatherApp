var express = require('express');
var app = express();

app.use(express.static('public'));
app.set('port', (process.env.PORT || 5000));
/*app.get('/',function (req,res) {
	res.sendFile('index.html');
});*/

app.listen(app.get('port'),function(){
	console.log('app is running at port 4000');
});