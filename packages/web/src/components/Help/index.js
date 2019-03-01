import React, { Component } from 'react'
import Drawer from '../Common/Drawer'

export default class index extends Component {
	render() {
		return (
			<div>
				<Drawer />
				<p>
					If you have any questions or suggestions please, contact me trough
					following email:
				</p>
				<p> andry.mironov94@gmail.com</p>
				<a href="http://mironov.site/home"> ...or my website </a>
			</div>
		)
	}
}
