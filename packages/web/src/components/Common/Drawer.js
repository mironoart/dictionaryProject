import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
	Drawer,
	AppBar,
	Toolbar,
	Typography,
	Divider,
	IconButton,
	Avatar
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MenuIcon from '@material-ui/icons/Menu'
import Icons from './Icons.js'
const drawerWidth = 240

const styles = theme => ({
	root: {
		display: 'flex'
	},

	bigAvatar: {
		margin: 10,
		width: 60,
		height: 60
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap'
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing.unit * 7 + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9 + 1
		}
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3
	}
})

class MiniDrawer extends React.Component {
	state = {
		open: false
	}

	handleDrawerOpen = () => {
		this.setState({ open: true })
	}

	handleDrawerClose = () => {
		this.setState({ open: false })
	}

	render() {
		const { classes, theme } = this.props
		const userData = JSON.parse(localStorage.getItem('user'))[0] || ''
		return (
			<div className={classes.root}>
				<AppBar
					position="fixed"
					className={classNames(classes.appBar, {
						[classes.appBarShift]: this.state.open
					})}
				>
					<Toolbar disableGutters={!this.state.open}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerOpen}
							className={classNames(classes.menuButton, {
								[classes.hide]: this.state.open
							})}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap>
							Translator - Dictionary - Revision
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="persistent"
					className={classNames(classes.drawer, {
						[classes.drawerOpen]: this.state.open,
						[classes.drawerClose]: !this.state.open
					})}
					classes={{
						paper: classNames({
							[classes.drawerOpen]: this.state.open,
							[classes.drawerClose]: !this.state.open
						})
					}}
					open={this.state.open}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}
					>
						<Avatar
							alt={userData.username}
							src={userData.image}
							className={classes.bigAvatar}
						/>

						<h3 style={{ margin: 'auto' }}> {userData.username}</h3>
						<div className={classes.toolbar}>
							<IconButton onClick={this.handleDrawerClose}>
								{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
							</IconButton>
						</div>
					</div>
					<Divider />
					<Icons />
				</Drawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />
				</main>
			</div>
		)
	}
}

MiniDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(MiniDrawer)
