const router = require('express').Router()
const passport = require('passport')
require('./strategies/googleStrategy')
import jwt from 'jsonwebtoken'

// first fire off to google for obtaining code and jumping to /google/redirect
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
)

// second when fire off code to google and getting all user info then
// passport firing his callback -- look passport-setup.js
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	const token = jwt.sign(req.user.info.id, process.env.COOKIE_KEY)
	console.log(token)
/* 	res.cookie('token', token, { maxAge: 1000, httpOnly: false })
 */	
let p = JSON.stringify(token)

res.redirect('http://localhost:3000/success?token=' + p)

})
module.exports = router
