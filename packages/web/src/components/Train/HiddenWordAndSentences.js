import React from 'react'

export default class HiddenWordAndSentences extends React.Component {
	render() {
		const props = this.props
		if (props.isWordShow === false) {
			return <div />
		} else {
			return (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div>
						<h3>{props.hiddenWord}</h3>
					</div>
					{props.hiddenSentences.map((item, index) => {
						return <i key={index}> {item} </i>
					})}
				</div>
			)
		}
	}
}
