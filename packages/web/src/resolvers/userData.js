import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import React from 'react'
import Loading from '../components/Common/Loading'

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
			{({ error, data, loading }) => {
				if (error) return 'Some error ocurred. Please try again'
				if (loading) return <Loading />
				else return <p>{setLocalStorage(data.getUserData)}</p>
			}}
		</Query>
	)
}

export default setUserData
