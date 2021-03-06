import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

const styles = theme => ({
	close: {
		padding: theme.spacing.unit / 2
	}
})

class SimpleSnackbar extends React.Component {
	state = {
		open: true
	}

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
	}

	render() {
		const { classes } = this.props
		return (
			<div>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left'
					}}
					open={this.state.open}
					autoHideDuration={1000}
					onClose={this.handleClose}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">Successfuly Added</span>}
					action={[
						<Button
							key="undo"
							color="secondary"
							size="small"
							onClick={this.handleClose}
						>
							Close
						</Button>,
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							className={classes.close}
							onClick={this.handleClose}
						/>
					]}
				/>
			</div>
		)
	}
}

SimpleSnackbar.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleSnackbar)
