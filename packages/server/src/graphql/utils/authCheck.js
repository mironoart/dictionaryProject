import jwt from 'jsonwebtoken'

const authCheck = ctx => {
	console.log('enter')
	const token = ctx.request.headers.token
	if (!token) throw 'Not authenticated!'

	try {
		return jwt.verify(token, process.env.COOKIE_KEY)
	} catch (error) {
		throw 'You dont have access'
	}
}

export default authCheck
