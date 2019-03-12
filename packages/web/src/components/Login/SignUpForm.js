import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const SIGN_UP = gql`
	mutation signUp($username: String!, $email: String!, $password: String!) {
		signUp(username: $username, email: $email, password: $password) {
			created
		}
	}
`

class TextFields extends React.Component {
	state = {
		email: '111',
		password: '',
		username: '111',
		isSubmitted: false
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.value })
	}

	render(props) {
		console.log(this.state)

		const style = {
			paper: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-evenly',
				maxWidth: '250px',
				padding: '10px',
				position: 'fixed',
				minHeight: '390px',
				top: '25%',
				left: 0,
				right: 0,
				margin: 'auto'
			},
			headers: {
				display: 'flex',
				justifyContent: 'space-evenly',
				cursor: 'pointer',
				color: 'rgb(65, 65, 65)'
			},
			image: {
				maxWidth: '90px'
			},
			signUp: {
				textAlign: 'end',
				padding: '25px 15px 10px 0',
				cursor: 'pointer',
				color: 'rgb(44, 111, 234)'
			}
		}

		const signUp = () => {
			this.setState({
				isSubmitted: true
			})
			this.props.mutate({
				variables: {
					email: this.state.email,
					password: this.state.password,
					username: this.state.username
				}
			})
		}

		if (this.state.isSubmitted)
			return (
				<Paper style={style.paper}>
					<h1> Created! </h1>
					<h2 style={style.signUp} onClick={() => this.props.signUpClick()}>
						Log In
					</h2>
				</Paper>
			)
		else
			return (
				<Paper style={style.paper}>
					<div style={style.headers}>
						<Typography variant="h5" component="h3">
							Sign up
						</Typography>
					</div>
					<TextField
						label="Username"
						value={this.state.name}
						onChange={this.handleChange('username')}
						margin="normal"
					/>
					<TextField
						label="Email"
						value={this.state.name}
						onChange={this.handleChange('email')}
						margin="normal"
					/>

					<TextField
						label="Password"
						type="password"
						value={this.state.name}
						onChange={this.handleChange('password')}
						margin="normal"
					/>

					<Button variant="contained" color="primary" onClick={() => signUp()}>
						Sign up
					</Button>

					<i style={style.signUp} onClick={() => this.props.signUpClick()}>
						Log In
					</i>
				</Paper>
			)
	}
}

export default graphql(SIGN_UP)(TextFields)
