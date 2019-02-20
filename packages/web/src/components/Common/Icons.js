import Home from '@material-ui/icons/HomeRounded'
import School from '@material-ui/icons/SchoolRounded'
import Stars from '@material-ui/icons/StarsRounded'
import Settings from '@material-ui/icons/SettingsRounded'
import Info from '@material-ui/icons/InfoRounded'
import Help from '@material-ui/icons/HelpRounded'
import History from '@material-ui/icons/HistoryRounded'
import LogOut from '@material-ui/icons/MeetingRoom'
import { ListItem, ListItemText, List } from '@material-ui/core'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'

export default class Icons extends Component {
	logOut = () => {
		localStorage.clear()
		window.location.reload(false)
	}
	render() {
		const state = {
			color: 'blue',
			linkStyle: { textDecoration: 'none' }
		}
		return (
			<List>
				<Link to="/" style={state.linkStyle}>
					<ListItem button>
						<Home nativeColor={state.color} />
						<ListItemText primary={'Main'} />
					</ListItem>
				</Link>
				<ListItem button>
					<School nativeColor={state.color} />
					<ListItemText primary={'Train'} />
				</ListItem>

				<Link to="/dictionary" style={state.linkStyle}>
					<ListItem button>
						<Stars nativeColor={state.color} />
						<ListItemText primary={'Dictionary'} />
					</ListItem>
				</Link>

				<ListItem button>
					<History nativeColor={state.color} />
					<ListItemText primary={'History'} />
				</ListItem>

				<ListItem button>
					<Settings nativeColor={state.color} />
					<ListItemText primary={'Settings'} />
				</ListItem>

				<ListItem button>
					<Info nativeColor={state.color} />
					<ListItemText primary={'Info'} />
				</ListItem>

				<ListItem button>
					<Help nativeColor={state.color} />
					<ListItemText primary={'Help'} />
				</ListItem>

				<ListItem button onClick={this.logOut}>
					<LogOut nativeColor={state.color} />
					<ListItemText primary="Log Out" />
				</ListItem>
			</List>
		)
	}
}
