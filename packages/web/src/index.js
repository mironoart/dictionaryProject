import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import { setContext } from 'apollo-link-context'
import { Provider } from 'unstated'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
if (localStorage.getItem('user') === null) {
	console.log('enter')
	localStorage.setItem(
		'user',
		JSON.stringify([
			{
				lengDirection: 'straight',
				quantityOfWords: 30,
				email: '',
				image:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRAkdqTCru5stUR5DC_hS4q0-UcW3xpzZ-Xg5rSuVsk4fPWHbX2Q',
				username: ''
			}
		])
	)
}

if (cookies.get('token') !== undefined) {
	localStorage.setItem('token', JSON.stringify(cookies.get('token')))
}
/* if (localStorage.getItem('token') === null) {
	localStorage.clear()
} */
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = JSON.parse(localStorage.getItem('token'))
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			token: token ? `${token}` : ''
		}
	}
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

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
