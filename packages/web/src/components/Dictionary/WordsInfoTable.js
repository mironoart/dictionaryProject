/* eslint-disable no-console */

import React from 'react'
import Paper from '@material-ui/core/Paper'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Loading from '../Common/Loading'

const GET_COLLECTION_DATA = gql`
	query getCollectionsData($collectionName: String!) {
		getCollectionsData(collectionName: $collectionName) {
			word
			translations
			sentences
			image
		}
	}
`
function ReactVirtualizedTable(props) {
	if (props.parentState.isWordsInfoTableHidden === true) {
		return <Paper style={{ height: 400, width: '30%' }} />
	} else {
		return (
			<Query
				query={GET_COLLECTION_DATA}
				variables={{ collectionName: props.parentState.collectionName }}
			>
				{({ error, loading, data }) => {
					if (error) return null
					if (loading)
						return (
							<Paper
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: 400,
									width: '30%'
								}}
							>
								<Loading />
							</Paper>
						)
					let sortedData = data.getCollectionsData.filter(item => {
						if (item.word === props.parentState.choosenWord) return true
					})
					return (
						<Paper style={{ height: 400, width: '30%' }}>
							{sortedData.map((item, index) => {
								let display
								if (item.image === '') display = 'none'

								return (
									<div key={index}>
										<h3>{item.translations} </h3>
										{item.sentences} <br />
										<div
											style={{
												display: 'flex',
												height: '100%'
											}}
										>
											<img
												src={item.image}
												style={{
													width: '100%',
													height: '100%',
													maxWidth: '200px'
												}}
											/>
										</div>
									</div>
								)
							})}
						</Paper>
					)
				}}
			</Query>
		)
	}
}

export default ReactVirtualizedTable
