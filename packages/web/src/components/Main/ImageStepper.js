import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import Loading from '../Common/Loading'

import { collectData } from '../../resolvers/choosenDataState.js'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

const GET_IMAGES = gql`
	query getimages($word: String!) {
		getImages(word: $word) {
			index
			img
		}
	}
`

const styles = theme => ({
	root: {
		width: 400,
		maxWidth: 400,
		flexGrow: 1
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		height: 50,
		paddingLeft: theme.spacing.unit * 4,
		backgroundColor: theme.palette.background.default
	},
	img: {
		height: 255,
		maxWidth: 400,
		overflow: 'hidden',
		display: 'block',
		width: '100%'
	}
})

class TextMobileStepper extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			activeStep: 0,
			showButton: 'flex',
			showImages: 'none',
			images: [
				{
					image: ''
				}
			]
		}
	}

	handleNext = () => {
		this.setState(prevState => ({
			activeStep: prevState.activeStep + 1
		}))
	}

	handleBack = () => {
		this.setState(prevState => ({
			activeStep: prevState.activeStep - 1
		}))
	}
	fetchImagesUrl = arr => {
		let images = arr.getImages.map((item, index) => {
			return {
				key: index,
				image: item.img
			}
		})
		images = images.splice(0, 10)
		this.setState({
			loading: false,
			images: images,
			showButton: 'none',
			showImages: 'block'
		})
	}
	render() {
		const state = this.state
		const { activeStep } = this.state
		const { classes, theme } = this.props
		let maxSteps = 10

		if (state.loading === true)
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
		return (
			<div className={classes.root}>
				{collectData.collectImgUrl(state.images[state.activeStep].image)}

				<div
					className={classes.img}
					style={{
						display: state.showButton,
						justifyContent: 'center',
						alignItems: 'center',
						height: '303px'
					}}
				>
					<ApolloConsumer>
						{client => (
							<Button
								variant="contained"
								color="primary"
								onClick={async () => {
									this.setState({ loading: true })
									const { data } = await client.query({
										query: GET_IMAGES,
										variables: { word: this.props.translatableWord }
									})
									this.fetchImagesUrl(data)
								}}
							>
								Tap to load more images...
							</Button>
						)}
					</ApolloConsumer>
				</div>
				<div className={classes.root} style={{ display: state.showImages }}>
					<div className={classes.img}>
						<img
							className={classes.img}
							alt={'Name'}
							src={state.images[activeStep].image}
							style={{ width: '100%' }}
						/>
					</div>
					<MobileStepper
						steps={maxSteps}
						position="static"
						activeStep={activeStep}
						className={classes.mobileStepper}
						nextButton={
							<Button
								size="small"
								onClick={this.handleNext}
								disabled={activeStep === maxSteps - 1}
							>
								Next
								{theme.direction === 'rtl' ? (
									<KeyboardArrowLeft />
								) : (
									<KeyboardArrowRight />
								)}
							</Button>
						}
						backButton={
							<Button
								size="small"
								onClick={this.handleBack}
								disabled={activeStep === 0}
							>
								{theme.direction === 'rtl' ? (
									<KeyboardArrowRight />
								) : (
									<KeyboardArrowLeft />
								)}
								Back
							</Button>
						}
					/>
				</div>
			</div>
		)
	}
}

TextMobileStepper.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(TextMobileStepper)
