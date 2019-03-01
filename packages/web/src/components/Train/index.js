import React, { Component } from 'react'

import { Grid, Paper } from '@material-ui/core'
import Drawer from '../Common/Drawer.js'

import HiddenSentences from './HiddenSentences'
import HiddenWordAndSentences from './HiddenWordAndSentences'
import HiddenImage from './HiddenImage.js'
import HiddenMemoryButtons from './HiddenMemoryButtons.js'
export default class index extends Component {
	constructor(props) {
		super(props)
		this.state = {
			displayedWord: 'Hi',
			displayedSentences: ['Firs sentence', 'Second sentence'],
			isSentencesShow: false,
			hiddenWord: 'Привет',
			isWordShow: false,
			hiddenSentences: ['First Hidden Sentence', 'Second Hidden Sentence'],
			image:
				'https://tse1.mm.bing.net/th?id=OIP.tiiEJVLfKz0hlirgCIiUowHaHG&pid=Api',
			isImageShow: false,
			isHiddenMemoryButtonsShow: false
		}
	}
	showHiddenSentences = () => {
		this.setState({
			isSentencesShow: true
		})
	}
	showHiddenImage = () => {
		this.setState({
			isImageShow: true
		})
	}
	showHiddenMemoryButtons = () => {
		this.setState({
			isWordShow: true,
			isImageShow: true,
			isHiddenMemoryButtonsShow: true
		})
	}

	render() {
		const styles = {
			paper: {
				display: 'flex',
				flexDirection: 'column',
				width: '300px',
				height: '600px'
			},
			mainWord: {
				height: '5%',
				textAlign: 'center'
			},
			hiddenSentencesContainer: {
				height: '15%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'end'
			},

			hiddenWordAndSentences: {
				height: '15%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'end',
				textAlign: 'center'
			},
			hiddenImage: {
				height: '60%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			},
			hiddenMemoryButtons: {
				width: '75px'
			}
		}
		return (
			<div>
				<Drawer />

				<Grid container direction="column" justify="center" alignItems="center">
					<Paper style={styles.paper}>
						<h3 style={styles.mainWord}> {this.state.displayedWord}</h3>

						<div style={styles.hiddenSentencesContainer}>
							<HiddenSentences
								sentences={this.state.displayedSentences}
								isSentencesShow={this.state.isSentencesShow}
								showHiddenSentences={this.showHiddenSentences}
							/>
						</div>
						<div style={styles.hiddenWordAndSentences}>
							<HiddenWordAndSentences
								hiddenWord={this.state.hiddenWord}
								isWordShow={this.state.isWordShow}
								hiddenSentences={this.state.hiddenSentences}
							/>
						</div>
						<div style={styles.hiddenImage}>
							<HiddenImage
								image={this.state.image}
								isImageShow={this.state.isImageShow}
								showHiddenImage={this.showHiddenImage}
							/>
						</div>
						<HiddenMemoryButtons
							styles={styles}
							isHiddenMemoryButtonsShow={this.state.isHiddenMemoryButtonsShow}
							showHiddenMemoryButtons={this.showHiddenMemoryButtons}
						/>
					</Paper>
				</Grid>
			</div>
		)
	}
}
