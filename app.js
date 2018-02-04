const express = require ('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
//passing in an object turning off the parser's extended option
app.use(bodyParser.urlencoded({extended: false}));
//call function directly and provide it to the application
app.use(cookieParser());

//app.set defines diff settings in express
//this line tells express which template engine to use
app.set('view engine', 'pug');
//no need to specify file extension.  express knows to look for file with
//pug extension
app.get('/', (req, res) => {
		const name = req.cookies.username;
		if(name) {
		res.render('index', { name });//index is the index.pug file
	} else {
		res.redirect('/hello');
	}
});

app.get('/cards', (req, res) => {
		res.render('card', { prompt: "Who is buried in Grant's", hint:
		 "Think about whose tomb it is."});
});
//'get' route is for serving the form itself
app.get('/hello', (req, res) => {
	const name = req.cookies.username;
	if(name) {
		res.redirect('/');
	} else {
		res.render('hello');
	}
});
//send the name to the server
app.post('/hello', (req, res) => {
	//prints out req object to the console
	// console.dir(req.body);
		res.cookie('username', req.body.username);
		res.redirect('/');
});

app.post('/goodbye', (req, res) => {
	//prints out req object to the console
	// console.dir(req.body);
		res.clearCookie('username');
		res.redirect('/hello');
});
app.listen(3000, () => {
	console.log('The application is running on localhost:3000!')
});
