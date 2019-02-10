import Home from '@material-ui/icons/HomeRounded'
import School from '@material-ui/icons/SchoolRounded'
import Stars from '@material-ui/icons/StarsRounded'
import Settings from '@material-ui/icons/SettingsRounded'
import Info from '@material-ui/icons/InfoRounded'
import Help from '@material-ui/icons/HelpRounded'
import History from '@material-ui/icons/HistoryRounded'

import React from 'react'

const icons = color => {
	return [
		{ name: 'Main', body: <Home nativeColor={color} /> },
		{ name: 'Train', body: <School nativeColor={color} /> },
		{ name: 'Dictionary', body: <Stars nativeColor={color} /> },
		{ name: 'History', body: <History nativeColor={color} /> },
		{ name: 'Settings', body: <Settings nativeColor={color} /> },
		{ name: 'Info', body: <Info nativeColor={color} /> },
		{ name: 'Help', body: <Help nativeColor={color} /> }
	]
}
export default icons
