import React, { Component } from 'react'
import { Button } from '@material-ui/core'

export default class HiddenMemoryButtons extends Component {
	render() {
		const props = this.props

		if (props.isHiddenMemoryButtonsShow === false) {
			return (
				<Button
					variant="contained"
					color="primary"
					onClick={() => props.showHiddenMemoryButtons()}
				>
					Turn flash card
				</Button>
			)
		} else
			return (
				<div>
					<Button
						style={{
							background: 'rgb(206, 48, 12)',
							color: 'white',
							width: '75px'
						}}
						variant="contained"
						onClick={event => console.log(event.target.innerText)}
					>
						Again
					</Button>
					<Button
						style={{ background: 'rgb(210, 126, 0)', color: 'white', width: '75px' }}
						variant="contained"
						onClick={event => console.log(event.target.innerText)}
					>
						Difficult
					</Button>
					<Button
						style={{ background: 'rgb(19, 211, 220)', color: 'white', width: '75px' }}
						variant="contained"
						onClick={event => console.log(event.target.innerText)}
					>
						Good
					</Button>
					<Button
						style={{ background: 'green', color: 'white', width: '75px' }}
						variant="contained"
						onClick={event => console.log(event.target.innerText)}
					>
						Perfect
					</Button>
				</div>
			)
	}
}
