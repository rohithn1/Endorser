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

router.get('/', urlencodedParser, authCheck, (req,res) => {
	console.log("profile-route get request");
	console.log(Object.keys(req));
	console.log(req.body);
	console.log(req.body.renderThis);
	res.render('dashboard', {user: req.user});
});


passport.deserializeUser(function(id, done) {
	Models.User.findById(id).then((user) => {
 		done(null, user);
	});
});

var create = true;
router.post('/', urlencodedParser, userCheck, (req,res) => {
	console.log("heres the req.body");
	console.log(req.body);
	if (req.body.rTitle) {
		console.log("entered if");
		new Models.Room({
			title: req.body.rTitle,
			roomID: req.body.rID,
			roomSecret: req.body.rSecret,
			memberIDs: {userID: req.user._id, username: req.user.username, thumbnail: req.user.thumbnail},
			endorsements: [null]
		})
		.save()
		.then((newRoom) => {
			//console.log("This is supposed to be the user mongo id"+newRoom.memberIDs[0]);
			Models.User.findById(newRoom.memberIDs[0].userID).then((user) => {
				if (user.memberOf == null) {
					user.memberOf = {roomID: newRoom._id, roomName: newRoom.title};
				} else {
					user.memberOf.push({roomID: newRoom._id, roomName: newRoom.title});
				}
				user.save()
					.then((updatedUser) => {
						res.render('dashboard', {user: updatedUser});
					});
			})
		})
	} else {
		console.log("entered else");
		Models.Room.findOne({roomID: req.body.rID}).then((room) => {
			if (room == null) { //it didnt find a room
				res.render('dashboard', {user: req.user})
				//res.send({user: req.user, error: 200});
				return;
			}
			if ((room.roomID==req.body.rID)&&(room.roomSecret==req.body.rSecret)) {
				console.log(room)
				console.log(room.memberIDs)
				if (room.memberIDs == null) {
					room.memberIDs = {userID: req.user._id, username: req.user.username, thumbnail: req.user.thumbnail}
				} else {
					for (let index of room.memberIDs) { //interate through the members
						console.log("Index: "+index);
						console.log(req.user._id)
						if (index.userID == req.user._id) {
							console.log("Enterd here and should have rendered the dahsboard")
							create = false;
							res.render('dashboard', {user: req.user})
							return;
						}
					}
					if (create) {
						console.log("create is true");
						room.memberIDs.push({userID: req.user._id, username: req.user.username, thumbnail: req.user.thumbnail})
						room.save()
						.then(() => {
							Models.User.findById(req.user._id).then((user) => {
								if (user.memberOf == null) {
									user.memberOf = {roomID: room._id, roomName: room.title};
								} else {
									user.memberOf.push({roomID: room._id, roomName: room.title});
								}
							 	user.save()
							 	.then((updatedUser) => {
							 		res.render('dashboard', {user: updatedUser})
							 	})
							});
						})
					}				
				}
			}
		});
	}
});

module.exports = router;

















