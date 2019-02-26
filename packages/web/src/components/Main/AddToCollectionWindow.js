/* eslint-disable no-console */
import React from 'react'
import Paper from '@material-ui/core/Paper'
import gql from 'graphql-tag'
import { graphql, Query } from 'react-apollo'
import Loading from '../Common/Loading'
import Button from '@material-ui/core/Button'

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
	const styles = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '600px',
		width: '400px',
		marginTop: '-600px',
		position: 'absolute'
	}

	const addToUserDb = event => {
		const { word, translatedWord, sentence, image } = props.variables
		props.mutate({
			variables: {
				collectionName: event.target.innerText,
				word: word,
				translations: translatedWord,
				sentence: sentence,
				image: image,
				time: new Date().getTime().toString()
			}
		})
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
								<Button
									variant="contained"
									color="primary"
									key={index}
									onClick={event => addToUserDb(event)}
								>
									{item.name}
								</Button>
							)
						})}
					</Paper>
				)
			}}
		</Query>
	)
}

export default graphql(ADD_TO_USER_COLLECTION)(AddToCollectionWindow)
