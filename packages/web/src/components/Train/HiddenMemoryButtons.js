import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const UPDATE_USER_COLLETCION_WORD_INFO = gql`
	mutation updateCollectionWordInfo(
		$id: String!
		$collection: String!
		$time: String!
	) {
		updateCollectionWordInfo(id: $id, collection: $collection, time: $time)
	}
`
class HiddenMemoryButtons extends Component {
	render() {
		const props = this.props

		const difficultUpdateWordInfo = () => {
			const { id, collectionName } = props.variables
			const nextTime = new Date()

			nextTime.setDate(nextTime.getDate() + 1)
			nextTime.toUTCString()

			props.mutate({
				variables: {
					id: id,
					collection: collectionName,
					time: nextTime
				}
			})
			props.memoryButtonHandler()
		}
		const GoodUpdateWordInfo = () => {
			const { id, collectionName } = props.variables
			const nextTime = new Date()

			nextTime.setDate(nextTime.getDate() + 5)
			nextTime.toUTCString()

			props.mutate({
				variables: {
					id: id,
					collection: collectionName,
					time: nextTime
				}
			})
			props.memoryButtonHandler()
		}

		const PerfectUpdateWordInfo = () => {
			const { id, collectionName } = props.variables
			const nextTime = new Date()

			nextTime.setDate(nextTime.getDate() + 14)
			nextTime.toUTCString()

			props.mutate({
				variables: {
					id: id,
					collection: collectionName,
					time: nextTime
				}
			})
			props.memoryButtonHandler()
		}

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
						onClick={() => props.againButtonHandler()}
					>
						Again
					</Button>
					<Button
						style={{ background: 'rgb(210, 126, 0)', color: 'white', width: '75px' }}
						variant="contained"
						onClick={() => difficultUpdateWordInfo()}
					>
						Difficult
					</Button>
					<Button
						style={{ background: 'rgb(19, 211, 220)', color: 'white', width: '75px' }}
						variant="contained"
						onClick={() => GoodUpdateWordInfo()}
					>
						Good
					</Button>
					<Button
						style={{ background: 'green', color: 'white', width: '75px' }}
						variant="contained"
						onClick={() => PerfectUpdateWordInfo()}
					>
						Perfect
					</Button>
				</div>
			)
	}
}

export default graphql(UPDATE_USER_COLLETCION_WORD_INFO)(HiddenMemoryButtons)
