import React, { Component } from 'react'

import Word from './Word'

/* export default class Words extends Component {
	render() {
		return this.props.translations.map((item, i) => {
			return (
				<Word
					word={item.word}
					confidence={item.confidence}
					variables={this.props.variables}
				/>
			)
		})
	}
}
 */

const translations = [
	{
		word: 'Hello',
		confidence: 0.23
	},
	{
		word: 'Hi',
		confidence: 0.56
	},
	{
		word: 'Hello',
		confidence: 0.83
	}
]
export default class Words extends Component {
	render() {
		return translations.map((item, i) => {
			return (
				<Word
					word={item.word}
					confidence={item.confidence}
					variables={this.props.variables}
				/>
			)
		})
	}
}
