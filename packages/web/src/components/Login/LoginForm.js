import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Loading from '../Common/Loading'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const LOG_IN = gql`
	query logIn($email: String!, $password: String!) {
		logIn(email: $email, password: $password) {
			lengDirection
			quantityOfWords
			email
			image
			username
			token
			error
		}
	}
`

class TextFields extends React.Component {
	state = {
		email: '',
		password: '',
		signUp: false,
		isSubmitted: false
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.value })
	}

	render() {
		console.log(this.state)
		const variables = {
			email: this.state.email,
			password: this.state.password
		}
		console.log(variables)
		const style = {
			paper: {
				display: 'flex',
				flexDirection: 'column',
				maxWidth: '250px',
				padding: '10px',
				position: 'fixed',
				minHeight: '330px',
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

		const logIn = () => {
			this.setState({
				isSubmitted: true
			})
		}
		const setLocalStorage = data => {
			console.log(data)
			if (data) {
				localStorage.setItem('user', JSON.stringify(data))
				localStorage.setItem('token', JSON.stringify(data[0].token))
			}
			window.location.reload()
		}

		if (this.state.isSubmitted) {
			return (
				<Paper style={style.paper}>
					<Query query={LOG_IN} variables={variables}>
						{({ error, loading, data }) => {
							if (error) return 'Some error ocurred. Please try again'
							if (loading) return <Loading />
							if (data.logIn[0].error !== null)
								return (
									<div>
										<p> {data.logIn[0].error} </p>
										<i style={style.signUp} onClick={() => this.props.signUpClick()}>
											Log In
										</i>
									</div>
								)
							else return <p>{setLocalStorage(data.logIn)}</p>
						}}
					</Query>
				</Paper>
			)
		} else
			return (
				<Paper style={style.paper}>
					<div style={style.headers}>
						<Typography variant="h5" component="h3">
							Log in
						</Typography>
					</div>
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
					<Button variant="contained" color="primary" onClick={() => logIn()}>
						Log in
					</Button>
					<br />
					<i>or log in with: </i>
					<a href="http://localhost:4000/auth/google">
						<img
							style={style.image}
							src="https://unitedwaterrestoration.com/wp-content/uploads/2012/11/Red-signin_Google_base_44dp.png"
							alt=""
						/>
					</a>

					<i style={style.signUp} onClick={() => this.props.signUpClick()}>
						Sign Up
					</i>
				</Paper>
			)
	}
}

export default TextFields
