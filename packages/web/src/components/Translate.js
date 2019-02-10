import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Card from './Card'
import Loading from './Loading'

export default class Translate extends Component {
	render(props) {
		const GET_LAUNCHES = gql`
			query translate($from: String!, $to: String!, $word: String!) {
				getMicrosoft(from: $from, to: $to, word: $word) {
					translatedWord
					partOfSpeech
					confidence
				}
			}
		`
		const data = this.props.data

		if (data.isReady) {
			return (
				<Query query={GET_LAUNCHES} variables={data}>
					{({ data, loading, error }) => {
						if (loading)
							return (
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										height: '303px'
									}}
								>
									<Loading />
								</div>
							)
						/* if (error) return <p>ERROR</p> */
						if (data === undefined) return 'No such word'
						return <Card data={data.getMicrosoft} variables={this.props.data} />
					}}
				</Query>
			)
		} else return null
	}
}
