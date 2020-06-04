const express = require('express');
const authRoute = require('./routes/auth-routes');
const profileRoute = require('./routes/profile-routes');
const passportSetup = require('./passport/passport-setup');
const mongoose = require('mongoose');
const keys = require('./passport/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path'); 

const app = express();

//view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
	maxAge: 24*60*60*1000, //1 day in ms
	keys: [keys.session.cookieKey]
}));

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