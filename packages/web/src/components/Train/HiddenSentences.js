import React from 'react'
import { Button } from '@material-ui/core'

export default class DisplayedSentences extends React.Component {
	render() {
		const props = this.props
		if (props.isSentencesShow === true) {
			return (
				<div>
					{props.sentences.map((item, index) => {
						return <i key={index}> {item} </i>
					})}
				</div>
			)
		} else {
			return (
				<Button
					variant="contained"
					color="primary"
					onClick={() => props.showHiddenSentences()}
				>
					Show DisplayedSentences
				</Button>
			)
		}
	}
}
