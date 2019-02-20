import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import React from 'react'

const setUserData = () => {
	const GET_USER_DATA = gql`
		query getUserData {
			getUserData {
				lengDirection
				quantityOfWords
				email
				image
				username
			}
		}
	`
	const setLocalStorage = data => {
		console.log(data)
		if (data) localStorage.setItem('user', JSON.stringify(data))
	}
	return (
		<Query query={GET_USER_DATA}>
			{({ error, data }) => {
				if (error) return null

				return <p>{setLocalStorage(data.getUserData)}</p>
			}}
		</Query>
	)
}

export default setUserData
