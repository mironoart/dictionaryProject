import React, { Component } from 'react'
import TranslateWiev from './translateWiev/TranslateWiev'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class Main extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={TranslateWiev} />
				</div>
			</Router>
		)
	}
}

export default Main
