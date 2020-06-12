const express = require('express');
	  authRoute = require('./routes/auth-routes');
	  profileRoute = require('./routes/profile-routes');
	  passportSetup = require('./passport/passport-setup');
	  mongoose = require('mongoose');
	  keys = require('./passport/keys');
	  passport = require('passport');
	  cookieSession = require('cookie-session');
	  path = require('path'); 
	  bodyParser = require('body-parser');
	  Models = require('./models/user-model');

const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

//view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
	maxAge: 24*60*60*1000, //1 day in ms
	keys: [keys.session.cookieKey]
}));

/*
app.post('/profile', urlencodedParser, (req,res) => {
	console.log(req.body);
	//res.render('dashboard', {user: req.user});
	new Models.Room({
		title: req.body.rTitle,
		roomID: req.body.rID,
		roomSecret: req.body.rSecret,
		memberIDs: [null],
		endorsements: [null]
		//console.log('got this far');
	})
	.save()
	.then((newRoom) => {
		console.log("New Room was created"+newRoom);
		app.use('/profile', profileRoute, newRoom);

	})
});
*/

//passport init
app.use(passport.initialize());
app.use(passport.session());

//setup routes
app.use(authRoute);
app.use('/profile', profileRoute);
app.use(express.static(path.join(__dirname, 'public')))

//create home route
app.get('/', (req, res) => {
	res.render('home');
});
app.get('/about', (req,res) => {
	res.render('about');
});

//mongoDB cluster
mongoose.connect(keys.mongoDB.URI, (err) =>{
	if (err) {
		console.log(err);
	} else {
		console.log('connected to mongoDB cluster'); 
	}
})

//port
app.listen(3000, () => console.log("Listening on port 3000"));