import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import ImageStepper from './ImageStepper'
import Buttons from './Buttons'
import Words from './Words'
import LoadMoreImages from './LoadMoreImages'

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
	state = {
		loadImages: false
	}
	render() {
		const translatableWord = this.props.variables.word
		const { classes } = this.props
		const data = this.props.data
		const translations = data.map((item, i) => {
			return {
				word: item.translatedWord,
				partOfSpeech: item.partOfSpeech,
				confidence: item.confidence
			}
		})

		const getMoreImages = () => {
			this.setState({ loadImages: true })
		}
		if (this.state.loadImages === false)
			return (
				<Card className={classes.card}>
					<CardHeader title={translatableWord} />
					<Words translations={translations} variables={this.props.variables} />
					<ImageStepper getMoreImages={getMoreImages} />
					<Buttons />
				</Card>
			)
		if (this.state.loadImages === true)
			return (
				<Card className={classes.card}>
					<CardHeader title={translatableWord} />
					<Words translations={translations} variables={this.props.variables} />
					<LoadMoreImages word={translatableWord} />
					<Buttons />
				</Card>
			)
	}
}

RecipeReviewCard.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RecipeReviewCard)
