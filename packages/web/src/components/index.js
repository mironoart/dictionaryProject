import React, { Component } from 'react'
import TranslateWiev from './Main'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SuccesWindow from './Common/successWindow'
import Dictionary from './Dictionary'
import Train from './Train'
class Main extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={TranslateWiev} />
					<Route path="/dictionary" component={Dictionary} />
					<Route path="/success" component={SuccesWindow} />
					<Route path="/train" component = {Train} />
				</div>
			</Router>
		)
	}
}

export default Main
