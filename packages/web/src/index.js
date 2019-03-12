import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import { setContext } from 'apollo-link-context'
import { Provider } from 'unstated'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
let p = window.location.search

if (p !== '') {
	let token = p.slice(10, p.length - 3)

	console.log('sett cookies')
	console.log(token)
	cookies.set('token', token)
}

if (localStorage.getItem('user') === null) {
	console.log('enter')
	localStorage.setItem(
		'user',
		JSON.stringify([
			{
				lengDirection: 'straight',
				quantityOfWords: 30,
				email: '',
				image: '',
				username: ''
			}
		])
	)
}

console.log(cookies.get('token'))
if (cookies.get('token') !== undefined) {
	localStorage.setItem('token', JSON.stringify(cookies.get('token')))
}

const authLink = setContext((_, { headers }) => {
	console.log('context')
	const token = JSON.parse(localStorage.getItem('token'))
	return {
		headers: {
			...headers,
			token: token ? `${token}` : ''
		}
	}
})

const httpLink = new HttpLink({
	uri: process.env.SERVER || 'http://localhost:4000'
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<Provider>
			<App />
		</Provider>
	</ApolloProvider>,
	document.getElementById('root')
)
