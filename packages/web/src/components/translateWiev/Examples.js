import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from './Loading'
/* import ExamplesSelect from './ExamplesSelect'
 */
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
						if (error)
							return (
								<p>
									Error ocurred! <br /> Please try again
								</p>
							)
						if (!data) return 'Examples hadn'

						let items = data.getExamples.map((items, i) => {
							return (
								<div key={i} style={{ display: 'flex', alignItems: 'center' }}>
									{/* <ExamplesSelect
										examples={{
											word: this.props.word,
											from: items.fromSentence,
											to: items.toSentence
										}}
									/> */}
									<p>
										{items.fromSentence} <br />
										{items.toSentence}
									</p>
								</div>
							)
						})
						items = items.splice(0, 5)
						return <div style={{ width: '350px' }}>{items} </div>
					}}
				</Query>
			)
		} else return null
	}
}
