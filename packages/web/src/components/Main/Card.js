import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import ImageStepper from './ImageStepper'
import AddButton from './AddButton'
import Words from './Words'
import { collectData } from '../../resolvers/choosenDataState.js'

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
		const translatableWord = this.props.variables.word
		const { classes } = this.props
		const data = this.props.data
		let translations = data.map((item, i) => {
			return {
				word: item.translatedWord,
				partOfSpeech: item.partOfSpeech,
				confidence: item.confidence
			}
		})
		if (translations.length === 0) translations = ['']

		return (
			<Card className={classes.card}>
				<CardHeader title={translatableWord} />
				<Words translations={translations} variables={this.props.variables} />
				<ImageStepper translatableWord={translatableWord} />
				<AddButton />
				{collectData.clearData()}
				{collectData.collectTranslatableWord(translatableWord)}
				{collectData.collectFromLanguage(this.props.variables.from)}
				{collectData.collectPartOfSpeech(translations[0].partOfSpeech)}
			</Card>
		)
	}
}

RecipeReviewCard.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RecipeReviewCard)
