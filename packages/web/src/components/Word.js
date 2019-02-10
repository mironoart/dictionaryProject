import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Progress from './Progress'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import Examples from './Examples'

export default class Word extends Component {
	constructor(props) {
		super(props)
		this.state = {
			expanded: false
		}
	}
	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }))
	}
	render() {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column'
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						margin: '0 20px 10px 20px',
						justifyContent: 'space-between'
					}}
				>
					<Button
						variant="contained"
						color="primary"
						onClick={this.handleExpandClick}
					>
						{this.props.word}
					</Button>

					<div style={{ width: '30%', display: 'flex' }}>
						<Progress frequency={this.props.confidence} />
						<i style={{ margin: 'auto', marginLeft: '10px' }}>
							{`${Math.round(this.props.confidence * 100)}%`}
						</i>
					</div>
				</div>
				<Collapse
					in={this.state.expanded}
					timeout="auto"
					unmountOnExit
					style={{ float: 'left' }}
				>
					<CardContent style={{ padding: '0 0 0 21px' }}>
						<Examples
							word={this.props.word}
							load={this.state.expanded}
							variables={this.props.variables}
						/>
					</CardContent>
				</Collapse>
			</div>
		)
	}
}
