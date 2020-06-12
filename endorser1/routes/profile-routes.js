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
	//console.log(id);
	Models.User.findById(id).then((user) => {
 		done(null, user);
 		//console.log(user);
	});
});

router.post('/', urlencodedParser, userCheck, (req,res) => {
	let userID = req.user._id;
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
			console.log('below is the console log of the user.memberOf');
			console.log(user.memberOf);
			if (user.memberOf == null) {
				user.memberOf = {roomID: newRoom._id};
			} else {
				user.memberOf.push({roomID: newRoom._id});
			}
			user.save()
				.then((updatedUser) => {
					console.log("New Room was created"+newRoom);
					console.log("User membership was updated"+updatedUser);
					console.log(updatedUser);
					res.render('dashboard', {user: updatedUser});
				});
 			//done(null, user);
 		//console.log(user);
		})
	})
});

module.exports = router;

















