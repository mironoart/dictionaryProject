import React, { Component } from 'react'

export default class HiddenImage extends Component {
	render() {
		const props = this.props

		if (props.isImageShow === false) {
			return (
				<i
					style={{ textDecoration: 'underline', cursor: 'pointer' }}
					onClick={() => props.showHiddenImage()}
				>
					Click to show image
				</i>
			)
		} else
			return (
				<img src={props.image} alt="" style={{ width: '100%', height: '100%' }} />
			)
	}
}
