import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import ImageStepper from './ImageStepper'
import Buttons from './Buttons'
import Words from './Words'

const styles = theme => ({
	card: {
		width: '100%'
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
	render() {
				const { classes } = this.props
	/* 	const data = this.props.data
		const translations = data.map((item, i) => {
			return {
				word: item.translatedWord,
				partOfSpeech: item.partOfSpeech,
				confidence: item.confidence
			}
		}) */
		return (
			<Card className={classes.card} >
				<CardHeader title=/* {translations.word} */ 'Hello' />
				<Words /* translations={translations} */ variables={this.props.variables} />
				<ImageStepper />
				<Buttons />
			</Card>
		)
	}
}

RecipeReviewCard.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RecipeReviewCard)
