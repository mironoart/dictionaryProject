import { Container, Subscribe } from 'unstated'
import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import AddToCollectionWindow from '../components/Main/AddToCollectionWindow'

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
		console.log('Word---', translatedWord)

		if (
			arr.every(item => {
				if (item !== translatedWord && item !== undefined) return true
				else return false
			})
		) {
			arr.push(translatedWord)
		} else {
			arr = arr.filter(item => {
				if (item !== translatedWord) return item
				else return null
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
		console.log(this.state.translatedWords)
	}
	updateExamples(examples) {
		let arr = this.state.examples
		if (
			arr.every(item => {
				if (item !== examples) return true
				else return false
			})
		) {
			arr.push(examples)
		} else {
			arr = arr.filter(item => {
				if (item.from !== examples.from && item.to !== examples.to) return item
				else return null
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
		console.log(this.state.examples)
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
	updateImgUrl = url => {
		this.state = {
			fromWord: this.state.fromWord,
			translatedWords: this.state.translatedWords,
			examples: this.state.examples,
			imgUrl: url,
			partOfSpeech: this.state.partOfSpeech,
			language: this.state.language
		}
	}
	clearData = () => {
		this.state = {
			fromWord: '',
			translatedWords: [],
			examples: [],
			imgUrl: '',
			partOfSpeech: '',
			language: ''
		}
		console.log(this.state)
	}
}
class UserData {
	collectTranslatableWord = translatableWord => {
		return (
			<Subscribe to={[wordData]}>
				{counter => {
					if (translatableWord) {
						counter.updateFromWord(translatableWord.toLowerCase())
					}

					return null
				}}
			</Subscribe>
		)
	}

	collectTranslations = translation => {
		return (
			<Subscribe to={[wordData]}>
				{counter => {
					if (translation !== '') {
						counter.updateTranslatedWord(translation.toLowerCase())
					}
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
	collectImgUrl = url => {
		return (
			<Subscribe to={[wordData]}>
				{counter => {
					if (url !== '') counter.updateImgUrl(url)
					console.log(counter.state)
					return null
				}}
			</Subscribe>
		)
	}

	addCollectedDataToDB = () => {
		console.log('Entered into collect data')

		return (
			<Subscribe to={[wordData]}>
				{counter => {
					const variables = {
						language: counter.state.language,
						word: counter.state.fromWord,
						translatedWord: counter.state.translatedWords[0],
						partOfSpeech: counter.state.partOfSpeech
					}
					const userVariables = {
						language: counter.state.language,
						word: counter.state.fromWord,
						translatedWord: counter.state.translatedWords,
						sentence: counter.state.examples,
						partOfSpeech: counter.state.partOfSpeech,
						image: counter.state.imgUrl
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

					console.log('VARIABLES ----', variables)
					console.log('USERVARIABLES----', userVariables)
					if (counter.state.fromWord === []) return 'Choose translation!'
					//if (counter.state.translation === undefined)
					//	return 'Translation is undefined!'
					else {
						return (
							<Mutation mutation={ADD_DATA_TO_DB} variables={variables}>
								{addWord => {
									return (
										<div /* onClick={addWord} */>
											<AddToCollectionWindow variables={userVariables} />
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
	clearData = () => {
		return (
			<Subscribe to={[wordData]}>
				{counter => {
					counter.clearData()
					return null
				}}
			</Subscribe>
		)
	}
}

const collectData = new UserData()

export { collectData }
