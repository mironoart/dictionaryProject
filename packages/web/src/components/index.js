import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import TranslateWiev from './Main'
import Train from './Train'
import Dictionary from './Dictionary'
import History from './History'
import Settings from './Settings'
import Info from './Info'
import Help from './Help'
import SuccesWindow from './Common/successWindow'

class Main extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={TranslateWiev} />
					<Route path="/train" component={Train} />
					<Route path="/dictionary" component={Dictionary} />
					<Route path="/history" component={History} />
					<Route path="/settings" component={Settings} />
					<Route path="/info" component={Info} />
					<Route path="/help" component={Help} />
					<Route path="/success" component={SuccesWindow} />
				</div>
			</Router>
		)
	}
}

export default Main
