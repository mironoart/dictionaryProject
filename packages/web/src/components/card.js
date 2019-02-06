import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import GridList from './gridList'
import Buttons from './buttons'

const styles = theme => ({
	card: {
		maxWidth: 400
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	actions: {
		display: 'flex'
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	button: {
		margin: theme.spacing.unit
	},
	input: {
		display: 'none'
	}
})

class RecipeReviewCard extends React.Component {
	state = { expanded: false }

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }))
	}

	render() {
		const { classes } = this.props

		return (
			<Card className={classes.card}>
				<CardHeader title="Translated Word" />
				<GridList />
				<Buttons />
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={this.handleExpandClick}
				>
					See More
				</Button>

				<CardContent>
					<Typography component="p">Here will be sentenses</Typography>
				</CardContent>

				<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography paragraph>
							Heat 1/2 cup of the broth in a pot until simmering
						</Typography>
						<Typography paragraph>
							Heat 1/2 cup of the broth in a pot until simmering
						</Typography>
						<Typography paragraph>
							Heat 1/2 cup of the broth in a pot until simmering
						</Typography>
						<Typography paragraph>
							Heat 1/2 cup of the broth in a pot until simmering
						</Typography>
					</CardContent>
				</Collapse>
			</Card>
		)
	}
}

RecipeReviewCard.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RecipeReviewCard)
