import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import Card from './card'
import Drawer from './drawer'
import Form from './formControl'

function CenteredGrid() {
	return (
		<React.Fragment>
			<Drawer />
			<Grid container direction="column" justify="center" alignItems="center">
				<div>
					<Grid
						container
						direction="row"
						justify="center"
						spacing={24}
						alignItems="center"
					>
						<Grid item>
							<Form />
						</Grid>
						<h3> To </h3>
						<Grid item>
							<Form />
						</Grid>
					</Grid>

					<Grid item>
						<TextField
							id="outlined-textarea"
							label="Multiline Placeholder"
							placeholder="Placeholder"
							multiline
							margin="normal"
							variant="outlined"
							style={{ width: '100%' }}
						/>
					</Grid>

					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
						spacing={24}
					>
						<Grid item justify="center" alignItems="center">
							<Card />
						</Grid>
						<Grid item justify="center" alignItems="center">
							<Card />
						</Grid>
					</Grid>
				</div>
			</Grid>
		</React.Fragment>
	)
}

export default CenteredGrid
