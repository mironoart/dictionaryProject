import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import WordsTable from './WordsTable'
import Drawer from '../Common/Drawer.js'
import CollectionsTable from './CollectionsTable'
import WordsInfoTable from './WordsInfoTable'

export default class index extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isWordsTableHidden: true,
			isWordsInfoTableHidden: true,
			collectionName: '',
			choosenWord: ''
		}
	}
	showWordsTable = collection => {
		this.setState({
			isWordsTableHidden: false,
			collectionName: collection
		})
	}

	showWordsInfoTable = choosenWord => {
		this.setState({
			isWordsInfoTableHidden: false,
			choosenWord: choosenWord
		})
	}

	render() {
		return (
			<div>
				<Drawer />

				<Grid container direction="row" justify="center" alignItems="center">
					<CollectionsTable showWordsTable={this.showWordsTable} />

					<WordsTable
						parentState={this.state}
						showWordsInfoTable={this.showWordsInfoTable}
					/>
					<WordsInfoTable parentState={this.state} />
				</Grid>
			</div>
		)
	}
}
