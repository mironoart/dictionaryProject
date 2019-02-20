import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from './Loading'
import ImageStepper from './ImageStepper'

export default class Translate extends Component {
	render(props) {
		const GET_IMAGES = gql`
			query getimages($word: String!) {
				getImages(word: $word) {
					index
					img
				}
			}
		`
		const data = {
			word: this.props.word
		}

		return (
			<Query query={GET_IMAGES} variables={data}>
				{({ data, loading, error }) => {
					if (loading)
						return (
							<div
								style={{
									width: '400px',
									maxWidth: '400px',
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
					if (data === undefined) return 'No such photos'
					let images = data.getImages.map((item, index) => {
						return {
							key: index,
							image: item.img
						}
					})

					images = images.splice(0, 10)
					return <ImageStepper images={images} />
				}}
			</Query>
		)
	}
}
