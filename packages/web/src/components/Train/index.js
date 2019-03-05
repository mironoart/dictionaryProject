import React, { Component } from 'react'

import { Grid, Paper } from '@material-ui/core'
import Drawer from '../Common/Drawer.js'

import HiddenSentences from './HiddenSentences'
import HiddenWordAndSentences from './HiddenWordAndSentences'
import HiddenImage from './HiddenImage.js'
import HiddenMemoryButtons from './HiddenMemoryButtons.js'

import SellectCollection from './SellectCollection.js'

class index extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSentencesShow: false,
			isWordShow: false,
			isImageShow: false,
			isHiddenMemoryButtonsShow: false,
			collection: 'Choose Collection',
			wordIterator: 0,
			wordsArr: [
				{
					id: '',
					word: '',
					translations: '',
					sentences: '',
					image: '',
					time: ''
				}
			]
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
	chooseCollection = collection => {
		this.setState({
			collection: collection
		})
	}
	getCollectionData = data => {
		let wordsArr = []

		data.getCollectionsData.forEach(item => {
			const pastTime = Date.parse(item.time)
			const now = new Date().getTime()
			if (pastTime < now) {
				wordsArr.push(item)
			}
		})
		if (wordsArr.length !== 0) {
			this.setState({
				wordsArr: wordsArr
			})
		}
	}

	againButtonHandler = () => {
		this.setState({
			wordIterator: Math.floor(Math.random() * this.state.wordsArr.length),
			isSentencesShow: false,
			isWordShow: false,
			isImageShow: false,
			isHiddenMemoryButtonsShow: false
		})
	}
	memoryButtonHandler = () => {
		const newWordsArr = this.state.wordsArr
		newWordsArr.splice([this.state.wordsIterator], 1)
		if (newWordsArr.length === 0) {
			this.setState({
				wordsArr: [{ id: '' }]
			})
		} else {
			this.setState({
				wordsArr: newWordsArr,
				isSentencesShow: false,
				isWordShow: false,
				isImageShow: false,
				isHiddenMemoryButtonsShow: false
			})
		}
	}

	render() {
		const wordIterator = this.state.wordIterator
		const wordsArr = this.state.wordsArr
		console.log(this.state.wordIterator, this.state.wordsArr)
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
				textAlign: 'center',
				justifyContent: 'center',
				alignItems: 'end'
			},

			hiddenWordAndSentences: {
				height: '15%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center'
			},
			hiddenImage: {
				height: '50%',
				padding: '40px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			},
			hiddenMemoryButtons: {
				width: '75px'
			}
		}
		if (this.state.wordsArr[0].id === '')
			return (
				<div>
					<Drawer />
					<Grid container direction="column" justify="center" alignItems="center">
						<Paper style={styles.paper}>
							<SellectCollection
								chooseCollection={this.chooseCollection}
								collectionName={this.state.collection}
								getCollectionData={this.getCollectionData}
							/>
						</Paper>
					</Grid>
				</div>
			)
		else
			return (
				<div>
					<Drawer />

					<Grid container direction="column" justify="center" alignItems="center">
						<Paper style={styles.paper}>
							<SellectCollection
								chooseCollection={this.chooseCollection}
								collectionName={this.state.collection}
								getCollectionData={this.getCollectionData}
							/>
							<i style={{ textAlign: 'center' }}> {wordsArr.length} words left</i>
							<h3 style={styles.mainWord}> {wordsArr[wordIterator].word}</h3>

							<div style={styles.hiddenSentencesContainer}>
								<HiddenSentences
									sentences={wordsArr[wordIterator].sentences}
									isSentencesShow={this.state.isSentencesShow}
									showHiddenSentences={this.showHiddenSentences}
								/>
							</div>
							<div style={styles.hiddenWordAndSentences}>
								<HiddenWordAndSentences
									hiddenWord={wordsArr[wordIterator].translations}
									isWordShow={this.state.isWordShow}
									hiddenSentences={wordsArr[wordIterator].sentences}
								/>
							</div>
							<div style={styles.hiddenImage}>
								<HiddenImage
									image={wordsArr[wordIterator].image}
									isImageShow={this.state.isImageShow}
									showHiddenImage={this.showHiddenImage}
								/>
							</div>
							<HiddenMemoryButtons
								variables={{
									id: this.state.wordsArr[wordIterator].id,
									collectionName: this.state.collection
								}}
								isHiddenMemoryButtonsShow={this.state.isHiddenMemoryButtonsShow}
								showHiddenMemoryButtons={this.showHiddenMemoryButtons}
								againButtonHandler={this.againButtonHandler}
								memoryButtonHandler={this.memoryButtonHandler}
							/>
						</Paper>
					</Grid>
				</div>
			)
	}
}

export default index
