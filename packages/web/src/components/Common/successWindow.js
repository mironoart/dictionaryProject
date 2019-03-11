import React, { Component } from 'react'
import userData from '../../resolvers/userData'
import { Redirect } from 'react-router'


export default class successWindow extends Component {
	constructor(props) {
		super(props)
		this.state = {
			redirect: false
		}
	}
	timeoutTrigger = () => {
		setTimeout(() => {
			this.setState({ redirect: true })
		}, 3000)
	}

	render() {



		const redirectToMain = () => {
			if (this.state.redirect === false) return this.timeoutTrigger()
		}
		if (this.state.redirect) return <Redirect to={'/'} />
		return (
			<div>
				<h1> Successfuly logged in! </h1>
				{userData()}
				{redirectToMain()}
			</div>
		)
	}
}
