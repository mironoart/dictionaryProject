/* eslint-disable no-console */
import React from 'react'
import Paper from '@material-ui/core/Paper'
import gql from 'graphql-tag'
import { graphql, Query } from 'react-apollo'
import Loading from '../Common/Loading'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

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
		$translations: String!
		$sentence: String!
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
function AddToCollectionWindow(props) {
	let newCollectionName = ''
	const styles = {
		display: 'flex',
		flexDirection: 'column',

		alignItems: 'center',
		height: '600px',
		width: '400px',
		marginTop: '-600px',
		position: 'absolute'
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
				time: new Date().getTime().toString()
			}
		})
		alert('Successfuly added!')
		window.location.reload()
	}
	const setNewCollectionName = event => {
		newCollectionName = event.target.value
	}

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
}

export default graphql(ADD_TO_USER_COLLECTION)(AddToCollectionWindow)
