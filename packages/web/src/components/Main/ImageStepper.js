import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

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
			activeStep: 0
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

	render(props) {
		const { classes, theme } = this.props
		const { activeStep } = this.state
		let maxSteps = 0
		let showButton = 'flex'
		let showImages = 'none'
		let images = [
			{
				image: ''
			}
		]
		if (this.props.images) {
			images = this.props.images
			maxSteps = this.props.images.length
			showButton = 'none'
			showImages = 'block'
		}

		return (
			<div className={classes.root}>
				<div
					className={classes.img}
					style={{
						display: showButton,
						justifyContent: 'center',
						alignItems: 'center',
						height: '303px'
					}}
				>
					<Button
						variant="contained"
						color="primary"
						onClick={this.props.getMoreImages}
					>
						Tap to load more images...
					</Button>
				</div>
				<div className={classes.root} style={{ display: showImages }}>
					<div className={classes.img}>
						<img
							className={classes.img}
							alt={'Name'}
							src={images[activeStep].image}
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
