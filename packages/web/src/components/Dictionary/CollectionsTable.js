/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Paper from '@material-ui/core/Paper'
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Loading from '../Common/Loading'

const styles = theme => ({
	table: {
		fontFamily: theme.typography.fontFamily
	},
	flexContainer: {
		display: 'flex',
		alignItems: 'center',
		boxSizing: 'border-box'
	},
	tableRow: {
		cursor: 'pointer'
	},
	tableRowHover: {
		'&:hover': {
			backgroundColor: theme.palette.grey[200]
		}
	},
	tableCell: {
		flex: 1
	},
	noClick: {
		cursor: 'initial'
	}
})

class MuiVirtualizedTable extends React.PureComponent {
	getRowClassName = ({ index }) => {
		const { classes, rowClassName, onRowClick } = this.props

		return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
			[classes.tableRowHover]: index !== -1 && onRowClick != null
		})
	}

	cellRenderer = ({ cellData, columnIndex = null }) => {
		const { columns, classes, rowHeight, onRowClick } = this.props
		return (
			<TableCell
				component="div"
				className={classNames(classes.tableCell, classes.flexContainer, {
					[classes.noClick]: onRowClick == null
				})}
				variant="body"
				style={{ height: rowHeight }}
				align={
					(columnIndex != null && columns[columnIndex].numeric) || false
						? 'right'
						: 'left'
				}
			>
				{cellData}
			</TableCell>
		)
	}

	headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
		const { headerHeight, columns, classes, sort } = this.props
		const direction = {
			[SortDirection.ASC]: 'asc',
			[SortDirection.DESC]: 'desc'
		}

		const inner =
			!columns[columnIndex].disableSort && sort != null ? (
				<TableSortLabel
					active={dataKey === sortBy}
					direction={direction[sortDirection]}
				>
					{label}
				</TableSortLabel>
			) : (
				label
			)

		return (
			<TableCell
				component="div"
				className={classNames(
					classes.tableCell,
					classes.flexContainer,
					classes.noClick
				)}
				variant="head"
				style={{ height: headerHeight }}
				align={columns[columnIndex].numeric || false ? 'right' : 'left'}
			>
				{inner}
			</TableCell>
		)
	}

	render() {
		const { classes, columns, ...tableProps } = this.props
		return (
			<AutoSizer>
				{({ height, width }) => (
					<Table
						className={classes.table}
						height={height}
						width={width}
						{...tableProps}
						rowClassName={this.getRowClassName}
					>
						{columns.map(
							(
								{ cellContentRenderer = null, className, dataKey, ...other },
								index
							) => {
								let renderer
								if (cellContentRenderer != null) {
									renderer = cellRendererProps =>
										this.cellRenderer({
											cellData: cellContentRenderer(cellRendererProps),
											columnIndex: index
										})
								} else {
									renderer = this.cellRenderer
								}

								return (
									<Column
										key={dataKey}
										headerRenderer={headerProps =>
											this.headerRenderer({
												...headerProps,
												columnIndex: index
											})
										}
										className={classNames(classes.flexContainer, className)}
										cellRenderer={renderer}
										dataKey={dataKey}
										{...other}
									/>
								)
							}
						)}
					</Table>
				)}
			</AutoSizer>
		)
	}
}

MuiVirtualizedTable.propTypes = {
	classes: PropTypes.object.isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			cellContentRenderer: PropTypes.func,
			dataKey: PropTypes.string.isRequired,
			width: PropTypes.number.isRequired
		})
	).isRequired,
	headerHeight: PropTypes.number,
	onRowClick: PropTypes.func,
	rowClassName: PropTypes.string,
	rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
	sort: PropTypes.func
}

MuiVirtualizedTable.defaultProps = {
	headerHeight: 56,
	rowHeight: 56
}

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable)

const GET_COLLECTIONS = gql`
	query getCollections {
		getCollections {
			name
		}
	}
`

let rows = []

function ReactVirtualizedTable(props) {
	const toggleWordsTable = e => {
		console.log(e.rowData.name)
		props.showWordsTable(e.rowData.name)
	}

	if (props.data.loading === true)
		return (
			<Paper
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: 400,
					width: '30%'
				}}
			>
				<Loading />
			</Paper>
		)

	if (props.data.loading === false) {
		rows = props.data.getCollections.map((item, index) => {
			return { id: index, name: item.name }
		})

		return (
			<Paper style={{ height: 400, width: '30%' }}>
				<WrappedVirtualizedTable
					rowCount={rows.length}
					rowGetter={({ index }) => rows[index]}
					onRowClick={e => toggleWordsTable(e)}
					columns={[
						{
							width: 200,
							flexGrow: 1.0,
							label: 'Collections',
							dataKey: 'name'
						}
					]}
				/>
			</Paper>
		)
	}
}

export default graphql(GET_COLLECTIONS)(ReactVirtualizedTable)