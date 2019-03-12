import React, { Component } from 'react'
import { Grid, TextField } from '@material-ui/core'
import Drawer from '../Common/Drawer'
import Form from './formControl'
import Translate from './Translate'
import Button from '@material-ui/core/Button'
import LoginForm from '../Login/LoginForm'
import SignUpForm from '../Login/SignUpForm'

class CenteredGrid extends Component {
	constructor(props) {
		super(props)

		this.state = {
			from: '',
			to: '',
			word: '',
			isSignUp: false
		}
	}
	changeFromLang = from => {
		this.setState({
			from: from,
			to: this.state.to,
			word: this.state.word
		})
	}
	changeToLang = to => {
		this.setState({
			from: this.state.from,
			to: to,
			word: this.state.word
		})
	}
	changeWord = event => {
		this.setState({
			from: this.state.from,
			to: this.state.to,
			word: event.target.value
		})
	}
	signUpClick = () => {
		let p
		!this.state.isSignUp ? (p = true) : (p = false)
		this.setState({
			isSignUp: p
		})
	}

	render() {
		const readyToggle = trigger => {
			this.state.isReady === true
				? this.setState({ isReady: false })
				: this.setState({ isReady: true })
		}
		let enableButton = true
		if (
			this.state.from !== '' &&
			this.state.to !== '' &&
			this.state.word !== ''
		) {
			enableButton = false
		}

		let isAuth = JSON.parse(localStorage.getItem('user'))

		if (isAuth[0].email === '' && !this.state.isSignUp)
			return <LoginForm signUpClick={this.signUpClick} />
		if (this.state.isSignUp) return <SignUpForm signUpClick={this.signUpClick} />
		else
			return (
				<React.Fragment>
					<Grid container direction="column" justify="center" alignItems="center">
						<Drawer />

						<div className="container">
							<Grid
								container
								direction="row"
								justify="center"
								spacing={24}
								alignItems="center"
							>
								<Form lang={this.changeFromLang} />
								<h3> &#10148; </h3>
								<Form lang={this.changeToLang} />
							</Grid>
							<TextField
								id="outlined-textarea"
								label="Multiline Placeholder"
								placeholder="Placeholder"
								multiline
								margin="normal"
								variant="outlined"
								style={{ width: '400px' }}
								onChange={event => {
									this.changeWord(event)
								}}
							/>
							<div
								style={{
									marginBottom: '10px',
									display: 'flex',
									justifyContent: 'center'
								}}
							>
								<Button
									variant="contained"
									color="primary"
									onClick={readyToggle}
									disabled={enableButton}
									style={{ width: '50%' }}
								>
									Translate
								</Button>
							</div>
							<Translate data={this.state} isReady={this.isReady} />
						</div>
					</Grid>
				</React.Fragment>
			)
	}
}

export default CenteredGrid
