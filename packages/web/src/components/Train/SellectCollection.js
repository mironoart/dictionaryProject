import React from 'react'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import Loading from '../Common/Loading'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import gql from 'graphql-tag'
import { graphql, ApolloConsumer } from 'react-apollo'

const GET_COLLECTIONS = gql`
	query getCollections {
		getCollections {
			name
		}
	}
`
const GET_COLLECTION_DATA = gql`
	query getCollectionsData($collectionName: String!) {
		getCollectionsData(collectionName: $collectionName) {
			id
			word
			translations
			sentences
			image
			time
		}
	}
`
function SimpleExpansionPanel(props) {
	const collectionNames = props.data.getCollections
	if (!collectionNames)
		return (
			<div>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography>Choose Collection</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<Loading />
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		)
	else
		return (
			<div>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography>{props.collectionName}</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<div
							style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
						>
							{collectionNames.map((item, index) => {
								return (
									<ApolloConsumer key={index}>
										{client => (
											<Typography
												onClick={async e => {
													props.chooseCollection(e.target.innerText)
													const { data } = await client.query({
														query: GET_COLLECTION_DATA,
														variables: { collectionName: e.target.innerText }
													})
													props.getCollectionData(data)
												}}
											>
												{item.name}
											</Typography>
										)}
									</ApolloConsumer>
								)
							})}
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		)
}

export default graphql(GET_COLLECTIONS)(SimpleExpansionPanel)
