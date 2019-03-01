import React from 'react'

export default class HiddenWordAndSentences extends React.Component {
	render() {
		const props = this.props
		if (props.isWordShow === false) {
			return <div />
		} else {
			return (
				<div>
					<div>
						<strong>{props.hiddenWord}</strong>
					</div>
					{props.hiddenSentences.map((item, index) => {
						return <i key={index}> {item} </i>
					})}
				</div>
			)
		}
	}
}
