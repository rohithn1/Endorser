const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const Models = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
	Models.User.findById(id).then((user) => {
 		done(null, user);
	});
});

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(
	new GoogleStrategy({
		clientID: keys.google.clientID,
    	clientSecret: keys.google.clientSecret,
    	callbackURL: '/google/redirect'
	}, (accessToken, refreshToken, profile, done) => {
		Models.User.findOne({googleID: profile.id}).then((currentUser) => {
			if (currentUser) {
				//user already exists
				console.log('user is: '+currentUser);
				done(null, currentUser);
			} else {
				new Models.User({
				username: profile.displayName,
				googleID: profile.id,
				memberOf: null,
				thumbnail: profile._json.picture
				//console.log('got this far');
			}).save(/*(err) => {
				if(err) {
					console.log('error at line 27');
					console.log(err);
				}
			}*/).then((newUser) => {
					console.log(newUser+'was created');
					done(null, newUser);
				});
			}
		});
	})
)