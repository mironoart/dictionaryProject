import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import LinearProgress from '@material-ui/core/LinearProgress'

const styles = {
	root: {
		flexGrow: 1
	}
}

class LinearDeterminate extends React.Component {
	state = {
		completed: this.props.frequency * 100
	}

	render() {
		const { classes } = this.props
		return (
			<div className={classes.root} style={{ height: '0%', margin: 'auto' }}>
				<LinearProgress variant="determinate" value={this.state.completed} />
			</div>
		)
	}
}

LinearDeterminate.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LinearDeterminate)
