import React, { Component } from 'react'
import Word from './Word'

export default class Words extends Component {
	render() {
		return this.props.translations.map((item, i) => {
			return (
				<Word
					key={i}
					word={item.word}
					confidence={item.confidence}
					variables={this.props.variables}
				/>
			)
		})
	}
}
