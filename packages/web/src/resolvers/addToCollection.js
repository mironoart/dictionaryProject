import { Container, Subscribe } from 'unstated'
import React from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const cookiesData = cookies.get(token)
console.log(cookiesData)
localStorage.setItem('token', JSON.stringify(cookiesData))
const test = JSON.parse(localStorage.getItem('token'))
console.log(test)

export class User extends Container {
	state = {
		dictionary: {},
		config: { lengDirection: '', quantityOfWords: '' },
		info: { email: '', username: '', image: '' }
	}

	setUserData(data) {
		this.state = {
			dictionary: data.dictionary
		}
	}
}

class UserInfo {
	setUserData = data => {
		return (
			<Subscribe to={[User]}>
				{counter => {
					if (data) counter.setUserData(data)

					return null
				}}
			</Subscribe>
		)
	}
}

const UserInfo = new UserInfo()

export { UserInfo }
