const router = require('express').Router();
const passport = require('passport');

//Google authorization
router.get('/google',passport.authenticate('google', {
	scope: ['profile']
}));

//Google callback
router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
	req.user
	res.redirect('/profile/');
})

//logout
router.get('/logout', (req,res) => {
	console.log('logging out');
	req.logout();
	res.redirect('/');
});

module.exports = router;