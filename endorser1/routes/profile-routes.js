const router = require('express').Router();
	  bodyParser = require('body-parser');
	  Models = require('../models/user-model');
	  passport = require('passport');
	  express = require('express');
	  app = express();

app.set('view engine', 'ejs');

//var user;
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const authCheck = (req,res,next) => {
	if (!req.user) 
		res.redirect('/');
	//user = req.user;
	next();
};

const userCheck = (req,res,next) => {
    if(req.user)
    next();
}

router.get('/', authCheck, (req,res) => {
	res.render('dashboard', {user: req.user});
});


passport.deserializeUser(function(id, done) {
	console.log(id);
	Models.User.findById(id).then((user) => {
 		done(null, user);
 		//console.log(user);
	});
});

router.post('/', urlencodedParser, userCheck, (req,res) => {
	//res.render('dashboard', {user: req.user});
	console.log("Hey this is the user at line 23 bruh: "+req.user);
	let userID = req.user._id;
	console.log(userID+" is userID");
	console.log(req.body);
	console.log("Req object: "+Object.keys(req));
	new Models.Room({
		title: req.body.rTitle,
		roomID: req.body.rID,
		roomSecret: req.body.rSecret,
		memberIDs: {userID: req.user._id},
		endorsements: [null]
	})
	.save()
	.then((newRoom) => {
		//console.log("This is supposed to be the user mongo id"+newRoom.memberIDs[0]);
		Models.User.findById(newRoom.memberIDs[0].userID).then((user) => {
			console.log('below is the console log of the user object from mongo');
			console.log(user);
			user.memberOf = [newRoom._id];
			console.log("User membership was updated"+user);
 			done(null, user);
 		//console.log(user);
		});
		console.log("New Room was created"+newRoom);
		res.render('dashboard', {user: req.user});
	})
});

module.exports = router;

















