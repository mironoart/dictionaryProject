const router = require('express').Router()
const passport = require('passport')

// first fire off to google for obtaining code and jumping to /google/redirect
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile'],
		session: false
	})
)

// second when fire off code to google and getting all user info then
// passport firing his callback -- look passport-setup.js
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	console.log(req.user)
	res.redirect('http://localhost:3000')
})
module.exports = router
