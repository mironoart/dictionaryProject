import React from 'react'

export default class DisplayedSentences extends React.Component {
	render() {
		const props = this.props
		if (props.isSentencesShow === true) {
			return (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{props.sentences.map((item, index) => {
						return <i key={index}> {item.from} </i>
					})}
				</div>
			)
		} else {
			return (
				<i
					style={{ textDecoration: 'underline', cursor: 'pointer' }}
					onClick={() => props.showHiddenSentences()}
				>
					Click to show sentences
				</i>
			)
		}
	}
}
