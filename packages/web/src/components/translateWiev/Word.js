import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Progress from './Progress'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import Examples from './Examples'
import Chip from '@material-ui/core/Chip'
import { collectData } from '../choosenDataState.js'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	chip: {
		margin: theme.spacing.unit
	}
})
class Word extends Component {
	constructor(props) {
		super(props)
		this.state = {
			expanded: false,
			variant: 'outlined',
			displayDown: 'block',
			displayUp: 'none',
			word: ''
		}
	}
	chooseChip = () => {
		if (this.state.variant === 'outlined')
			this.setState({ variant: 'default', word: this.props.word })
		else this.setState({ variant: 'outlined', word: this.props.word })
	}
	handleExpandClick = () => {
		this.setState(state => ({
			expanded: !state.expanded
		}))
		this.state.displayDown === 'block'
			? this.setState({ displayDown: 'none', word: '' })
			: this.setState({ displayDown: 'block', word: '' })
		this.state.displayDown === 'block'
			? this.setState({ displayUp: 'block', word: '' })
			: this.setState({ displayUp: 'none', word: '' })
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
						justifyContent: 'space-between',
						position: 'relative'
					}}
				>
					<ChevronRightIcon
						onClick={this.handleExpandClick}
						nativeColor={'blue'}
						style={{
							display: this.state.displayDown,
							marginTop: '4px',
							marginLeft: '-6px',
							cursor: 'pointer'
						}}
					/>
					<ChevronRightIcon
						onClick={this.handleExpandClick}
						nativeColor={'blue'}
						style={{
							display: this.state.displayUp,
							marginTop: '4px',
							cursor: 'pointer',
							marginLeft: '-6px',
							transform: 'rotate(90deg)'
						}}
					/>

					<Chip
						label={this.props.word}
						clickable
						color="primary"
						variant={this.state.variant}
						onClick={this.chooseChip}
						style={{ position: 'absolute', left: '27px' }}
					/>
					{collectData.collectTranslations(this.state.word)}

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

export default withStyles(styles)(Word)
