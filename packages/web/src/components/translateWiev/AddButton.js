import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import { collectData } from '../choosenDataState.js'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'

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
		} else
			return (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<React.Fragment>
						<p> Do you want add this card to your collection? </p>
						<div
							style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}
						>
							{collectData.addCollectedDataToDB()}
							<Button variant="contained" color="primary" onClick={this.trigger} style ={{marginLeft:'5px'}}>
								No
							</Button>
						</div>
					</React.Fragment>
				</div>
			)
	}
}

FloatingActionButtons.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FloatingActionButtons)
