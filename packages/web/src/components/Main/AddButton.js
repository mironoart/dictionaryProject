import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import { collectData } from '../../resolvers/choosenDataState.js'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
	fab: {
		margin: theme.spacing.unit
	},
	extendedIcon: {
		marginRight: theme.spacing.unit
	}
})

class FloatingActionButtons extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			confirm: true
		}
	}

	trigger = () => {
		this.state.confirm === true
			? this.setState({ confirm: false })
			: this.setState({ confirm: true })
	}
	render(props) {
		if (this.state.confirm) {
			return (
				<div
					style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}
				>
					<Fab size="small" color="primary" aria-label="Add" onClick={this.trigger}>
						<AddIcon />
					</Fab>
				</div>
			)
		} else return <div>{collectData.addCollectedDataToDB()}</div>
	}
}

FloatingActionButtons.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FloatingActionButtons)
