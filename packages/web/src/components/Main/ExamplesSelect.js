import React, { PureComponent } from 'react'
import Star from '@material-ui/icons/StarRounded'
import { collectData } from '../choosenDataState.js'

export default class ExamplesSelect extends PureComponent {
	/* 	constructor(props) {
		super(props)
		this.state = {
			color: '#8d8d8d',
			examples: ''
		}
	} */

	select = () => {
		this.state.color === '#8d8d8d'
			? this.setState({ color: 'blue', example: this.props.examples })
			: this.setState({ color: '#8d8d8d' })
	}

	render() {
		console.log(this.state)
		return (
			<React.Fragment>
				{collectData.collectExamples(this.state.example)}
				<Star
					nativeColor={this.state.color}
					onClick={this.select}
					style={{ marginRight: '10px', cursor: 'pointer' }}
				/>
			</React.Fragment>
		)
	}
}
