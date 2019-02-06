import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import tileData from '../media/images.js'

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden'
	},
	gridList: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)'
	},
	title: {
		color: theme.palette.primary.light
	},
	titleBar: {
		background: 'none'
	}
})

function SingleLineGridList(props) {
	const { classes } = props

	return (
		<div className={classes.root}>
			<GridList className={classes.gridList} cols={1}>
				{tileData.map(tile => (
					<GridListTile key={tile.img}>
						<img src={tile.img} alt={tile.title} />
						<GridListTileBar
							title={tile.title}
							classes={{
								root: classes.titleBar,
								title: classes.title
							}}
							actionIcon={
								<IconButton>
									<StarBorderIcon className={classes.title} />
								</IconButton>
							}
						/>
					</GridListTile>
				))}
			</GridList>
		</div>
	)
}

SingleLineGridList.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SingleLineGridList)
