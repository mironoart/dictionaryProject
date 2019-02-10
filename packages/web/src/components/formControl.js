import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { withStyles } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2
	}
})

class NativeSelects extends React.Component {
	state = {
		language: '',
		name: 'hai',
		labelWidth: 0
	}

	componentDidMount() {
		this.setState({
			labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
		})
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.value })
		if (event.target.value === 'English') {
			this.props.lang('en')
		}
		if (event.target.value === 'Russian') {
			this.props.lang('ru')
		}
		if (!event.target.value) {
			this.props.lang('')
		}
	}

	render() {
		const { classes } = this.props

		return (
			<div className={classes.root}>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel
						ref={ref => {
							this.InputLabelRef = ref
						}}
						htmlFor="outlined-age-native-simple"
					>
						Language
					</InputLabel>
					<Select
						native
						value={this.state.language}
						onChange={this.handleChange('language')}
						input={
							<OutlinedInput
								name="Language"
								labelWidth={this.state.labelWidth}
								id="outlined-age-native-simple"
							/>
						}
					>
						<option value="" />
						<option value={'English'}>English</option>
						<option value={'Russian'}>Russian</option>
					</Select>
				</FormControl>
			</div>
		)
	}
}

NativeSelects.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NativeSelects)
