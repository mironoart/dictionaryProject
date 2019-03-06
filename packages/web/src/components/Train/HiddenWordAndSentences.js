import React from 'react'

export default class HiddenWordAndSentences extends React.Component {
	render() {
		const props = this.props
		console.log(props)
		if (props.isWordShow === false) {
			return <div />
		} else {
			return (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<h3>
						{props.hiddenWordsArr.map((item, index) => {
							return <div key={index}>{item} </div>
						})}
					</h3>
					<div style={{ overflowY: 'auto' }}>
						{props.hiddenSentences.map((item, index) => {
							return <i key={index}> {item.to} </i>
						})}
					</div>
				</div>
			)
		}
	}
}
