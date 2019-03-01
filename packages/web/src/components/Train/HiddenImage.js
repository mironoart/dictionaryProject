import React, { Component } from 'react'
import { Button } from '@material-ui/core'

export default class HiddenImage extends Component {
	render() {
		const props = this.props

		if (props.isImageShow === false) {
			return (
				<Button
					variant="contained"
					color="primary"
					onClick={() => props.showHiddenImage()}
				>
					Show Hidden Image
				</Button>
			)
		} else return <img src={props.image} alt="" style={{ width: '100%' }} />
	}
}
