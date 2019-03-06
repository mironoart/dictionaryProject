/* eslint-disable no-console */
import React from 'react'
import gql from 'graphql-tag'
import { graphql, Query } from 'react-apollo'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import Loading from '../Common/Loading'
import SnackBar from './SnackBar'

const GET_COLLECTIONS = gql`
	query getCollections {
		getCollections {
			name
		}
	}
`
const ADD_TO_USER_COLLECTION = gql`
	mutation addToUserCollection(
		$collectionName: String!
		$word: String!
		$translations: [String!]
		$sentence: [Test!]
		$image: String!
		$time: String!
	) {
		addToUserCollection(
			collectionName: $collectionName
			word: $word
			translations: $translations
			sentence: $sentence
			image: $image
			time: $time
		)
	}
`
class AddToCollectionWindow extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isAdded: false
		}
	}
	render() {
		const props = this.props
		let newCollectionName = ''
		const styles = {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',

			position: 'fixed',
			top: '64px',
			bottom: '0',
			left: '0',
			right: '0',
			zIndex: '999'
		}
		console.log(props.variables)

		const addToUserDb = event => {
			const { word, translatedWord, sentence, image } = props.variables
			console.log(event)

			let collectionName = ''
			if (typeof event === typeof '') {
				collectionName = event
			} else {
				collectionName = event.target.innerText
			}
			props.mutate({
				variables: {
					collectionName: collectionName,
					word: word,
					translations: translatedWord,
					sentence: sentence,
					image: image || '',
					time: new Date().toUTCString()
				}
			})
			this.setState({
				isAdded: true
			})
		}
		const setNewCollectionName = event => {
			newCollectionName = event.target.value
		}

		if (!this.state.isAdded)
			return (
				<Query query={GET_COLLECTIONS}>
					{({ data, loading, error }) => {
						if (loading)
							return (
								<Paper style={styles}>
									<Loading />
								</Paper>
							)
						if (error) return 'Error'
						return (
							<Paper style={styles}>
								<h2>Choose collection: </h2>
								{data.getCollections.map((item, index) => {
									return (
										<h3
											style={{ marginBottom: '5px', cursor: 'pointer' }}
											key={index}
											onClick={event => addToUserDb(event)}
										>
											{item.name}
										</h3>
									)
								})}
								<h2>Create New Collection: </h2>
								<TextField
									style={{ marginBottom: '5px' }}
									variant="outlined"
									id="custom-css-outlined-input"
									onChange={event => setNewCollectionName(event)}
								/>
								<Button
									variant="contained"
									color="primary"
									onClick={() => addToUserDb(newCollectionName)}
								>
									Add
								</Button>
							</Paper>
						)
					}}
				</Query>
			)
		else return <SnackBar />
	}
}

export default graphql(ADD_TO_USER_COLLECTION)(AddToCollectionWindow)
