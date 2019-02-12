import { Container, Subscribe } from 'unstated'
import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'

export class wordData extends Container {
	state = {
		fromWord: '',
		translatedWords: [],
		examples: [],
		imgUrl: '',
		partOfSpeech: '',
		language: ''
	}
	updateFromWord(fromWord) {
		this.state = {
			fromWord: fromWord,
			translatedWords: this.state.translatedWords,
			examples: this.state.examples,
			imgUrl: this.state.imgUrl,
			partOfSpeech: this.state.partOfSpeech,
			language: this.state.language
		}
	}
	updateTranslatedWord(translatedWord) {
		let arr = this.state.translatedWords
		if (
			arr.every(item => {
				if (item !== translatedWord) return true
			})
		) {
			arr.push(translatedWord)
		} else {
			arr = arr.filter(item => {
				if (item !== translatedWord) return item
			})
		}

		this.state = {
			fromWord: this.state.fromWord,
			translatedWords: arr,
			examples: this.state.examples,
			imgUrl: this.state.imgUrl,
			partOfSpeech: this.state.partOfSpeech,
			language: this.state.language
		}
	}
	updateExamples(examples) {
		let arr = this.state.examples
		if (
			arr.every(item => {
				if (item !== examples) return true
			})
		) {
			arr.push(examples)
		} else {
			arr = arr.filter(item => {
				if (item.from !== examples.from && item.to !== examples.to) return item
			})
		}

		this.state = {
			fromWord: this.state.fromWord,
			translatedWords: this.state.translatedWords,
			examples: arr,
			imgUrl: this.state.imgUrl,
			partOfSpeech: this.state.partOfSpeech,
			language: this.state.language
		}
	}
	updateImgUrl(url) {
		this.state = {
			fromWord: this.state.fromWord,
			translatedWords: this.state.translatedWords,
			examples: this.state.examples,
			imgUrl: url,
			partOfSpeech: this.state.partOfSpeech,
			language: this.state.language
		}
	}
	updateFromLanguage = fromLang => {
		let lang
		if (fromLang === 'en') lang = 'English'
		if (fromLang === 'ru') lang = 'Russian'
		if (fromLang === 'es') lang = 'Spanish'
		this.state = {
			fromWord: this.state.fromWord,
			translatedWords: this.state.translatedWords,
			examples: this.state.examples,
			imgUrl: this.state.url,
			partOfSpeech: this.state.partOfSpeech,
			language: lang
		}
	}
	updatePartOfSpeech = partOfSpeech => {
		this.state = {
			fromWord: this.state.fromWord,
			translatedWords: this.state.translatedWords,
			examples: this.state.examples,
			imgUrl: this.state.url,
			partOfSpeech: partOfSpeech,
			language: this.state.language
		}
	}
}
class UserData {
	collectTranslatableWord = translatableWord => {
		return (
			<Subscribe to={[wordData]}>
				{counter => {
					if (translatableWord) counter.updateFromWord(translatableWord)

					return null
				}}
			</Subscribe>
		)
	}

	collectTranslations = traslation => {
		return (
			<Subscribe to={[wordData]}>
				{counter => {
					if (traslation !== '') counter.updateTranslatedWord(traslation)
					return null
				}}
			</Subscribe>
		)
	}

	collectExamples = examples => {
		return (
			<Subscribe to={[wordData]}>
				{counter => {
					if (counter.state) counter.updateExamples(examples)
					console.log(counter.state)
					return null
				}}
			</Subscribe>
		)
	}
	collectFromLanguage = leng => {
		return (
			<Subscribe to={[wordData]}>
				{counter => {
					counter.updateFromLanguage(leng)
					console.log(counter.state)
					return null
				}}
			</Subscribe>
		)
	}
	collectPartOfSpeech = speech => {
		return (
			<Subscribe to={[wordData]}>
				{counter => {
					counter.updatePartOfSpeech(speech)
					console.log(counter.state)
					return null
				}}
			</Subscribe>
		)
	}

	addCollectedDataToDB = () => {
		console.log('Entered')
		const successInfo = variables => {
			alert('Successfuly added')
		}
		return (
			<Subscribe to={[wordData]}>
				{counter => {
					const variables = {
						language: counter.state.language,
						word: counter.state.fromWord,
						translatedWord: counter.state.translatedWords[0],
						partOfSpeech: counter.state.partOfSpeech
					}

					const ADD_DATA_TO_DB = gql`
						mutation addWord(
							$language: String!
							$word: String!
							$translatedWord: String!
							$partOfSpeech: String!
						) {
							addWord(
								language: $language
								word: $word
								translatedWord: $translatedWord
								partOfSpeech: $partOfSpeech
							)
						}
					`

					console.log(variables)
					if (counter.state.fromWord === []) return 'Choose translation!'
					else {
						return (
							<Mutation mutation={ADD_DATA_TO_DB} variables={variables}>
								{addWord => {
									return (
										<div onClick={addWord}>
											<Button variant="contained" color="primary" onClick={successInfo}>
												Yes
											</Button>
										</div>
									)
								}}
							</Mutation>
						)
					}
				}}
			</Subscribe>
		)
	}
}

const collectData = new UserData()

export { collectData }
