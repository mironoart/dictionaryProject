import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from './Loading'

export default class Examples extends Component {
	render() {
		const GET_EXAMPLES = gql`
			query examples(
				$from: String!
				$to: String!
				$word: String!
				$translation: String!
			) {
				getExamples(from: $from, to: $to, word: $word, translation: $translation) {
					fromSentence
					toSentence
				}
			}
		`
		const variables = this.props.variables
		variables.translation = this.props.word.toLowerCase()
		const load = this.props.load
		if (load) {
			return (
				<Query query={GET_EXAMPLES} variables={variables}>
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
						if (error) return <p>ERROR</p>
						if (!data) return 'Examples hadn'

						const items = data.getExamples.map((items, i) => {
							return (
								<p key={i}>
									{items.fromSentence} <br />
									{items.toSentence}
								</p>
							)
						})

						return items.splice(0, 5)
					}}
				</Query>
			)
		} else return null
	}
}
