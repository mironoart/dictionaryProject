import React from 'react'
import Drawer from '../Common/Drawer'

import { Grid, Button } from '@material-ui/core'

export default class Info extends React.Component {
	render() {
		return (
			<div>
				<Drawer />

				<Grid container direction="column" justify="center" alignItems="center">
					<h1> `NAME of WEBSITE HERE`</h1>
					<div style={{ width: '100%' }}>
						<ul>
							<a href="#about">
								<li> About</li>
							</a>
							<a href="#howToUse">
								<li> How to use</li>
							</a>
						</ul>
					</div>
					<section>
						<h2 id="about"> About </h2>
						<p>
							This version of Web App based on <strong>Leitner system</strong> <br />
							The Leitner system is a widely used method of efficiently using
							flashcards that was proposed by the German science journalist Sebastian
							Leitner in the 1970s. It is a simple implementation of the principle of
							spaced repetition, where cards are reviewed at increasing intervals.
						</p>
						<p>
							In this method flashcards are sorted into groups according to how well
							the learner knows each one in the Leitner's learning box. The learners
							try to recall the solution written on a flashcard. If they succeed, they
							send the card to the next group. If they fail, they send it back to the
							first group. Each succeeding group has a longer period of time before the
							learner is required to revisit the cards.
						</p>
					</section>
					<section>
						<h2 id="howToUse"> How to use</h2>
						<p>
							Cards are sorted into three groups: <strong> Difficult</strong>,
							<strong>Good</strong> and <strong>Perfect</strong>. In
							<strong> Difficult</strong> group cards are placed with new words and
							with words that the student has learned poorly. <strong>Perfect</strong>{' '}
							contains cards with words that the student knows very well. A student can
							repeat words from <strong> Difficult</strong> group every day, words from{' '}
							<strong>Good</strong> group every 5 days, and words from
							<strong>Perfect</strong> group every two weeks.
						</p>

						<div style={{ height: 'fit-content' }}>
							<Button
								style={{
									background: 'rgb(206, 48, 12)',
									color: 'white',
									width: '75px',
									float: 'left',
									marginRight: '15px'
								}}
								variant="contained"
							>
								Again
							</Button>
							<p>
								Try to remember this word once again. It means that word will be shown
								again in this session.
							</p>
						</div>
						<div style={{ height: 'fit-content' }}>
							<Button
								style={{
									background: 'rgb(210, 126, 0)',
									color: 'white',
									width: '75px',
									float: 'left',
									marginRight: '15px'
								}}
								variant="contained"
							>
								Difficult
							</Button>
							<p>
								Choose this one if you remembered word, but you made a mistake. Even if
								it was small one. Also if word have been added not so long ago. Try to
								be honest with yourself!
							</p>
						</div>
						<div style={{ height: 'fit-content' }}>
							<Button
								style={{
									background: 'rgb(19, 211, 220)',
									color: 'white',
									width: '75px',
									float: 'left',
									marginRight: '15px'
								}}
								variant="contained"
							>
								Good
							</Button>
							<p>
								Tap this button only if you sure you know this word and it was just a
								few moments before you rememberd.
							</p>
						</div>
						<div style={{ height: 'fit-content' }}>
							<Button
								style={{
									background: 'green',
									color: 'white',
									width: '75px',
									float: 'left',
									marginRight: '15px'
								}}
								variant="contained"
							>
								Perfect
							</Button>
							<p>
								Tap only if you remembered word instantly made no mistakes and have some
								imagination relative to this word.
							</p>
						</div>
					</section>
				</Grid>
			</div>
		)
	}
}
