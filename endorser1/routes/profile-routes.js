const router = require('express').Router();

const authCheck = (req,res,next) => {
	if (!req.user)
		res.redirect('/');
	next();
};

router.get('/', authCheck, (req,res) => {
	console.log('Logged in as '+req.user.username);
	res.render('dashboard', {user: req.user});
});

module.exports = router;