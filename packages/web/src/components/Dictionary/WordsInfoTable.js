/* eslint-disable no-console */

import React from 'react'
import Paper from '@material-ui/core/Paper'

function ReactVirtualizedTable(props) {
	let chosenWordInfo = []
	if (props.parentState.wordInfo) {
		chosenWordInfo = props.parentState.wordInfo.filter(item => {
			if (item.word === props.parentState.choosenWord) return true
			return false
		})
	}
	chosenWordInfo = chosenWordInfo[0]
	console.log(chosenWordInfo)
	if (props.parentState.isWordsInfoTableHidden === true) {
		return <Paper style={{ height: 400, width: '30%' }} />
	} else {
		return (
			<Paper style={{ height: 400, width: '30%', overflow: 'scroll' }}>
				<div style={{ padding: '10px' }}>
					<h3 style={{ marginBottom: '0' }}> {chosenWordInfo.word}</h3>
					{chosenWordInfo.translations.map((item, index) => {
						return <i key={index}>{item}, </i>
					})}

					{chosenWordInfo.sentences.map((item, index) => {
						return (
							<p key={index}>
								{index + 1}. <i>{item.from}</i>
								<br />
								<i> {item.to}</i>
							</p>
						)
					})}
					<h4>
						Next train time: <br /> {chosenWordInfo.time}
					</h4>
				</div>

				<div
					style={{
						display: 'flex'
					}}
				>
					<img
						src={chosenWordInfo.image}
						style={{
							width: '100%',
							height: '100%',
							maxWidth: '200px'
						}}
						alt=""
					/>
				</div>
			</Paper>
		)
	}
}

export default ReactVirtualizedTable
