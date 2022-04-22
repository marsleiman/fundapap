import { makeStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableContainer from "@material-ui/core/TableContainer";
import {TablePagination} from "@mui/material";
import React from "react";

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: '3px',
        margin: '2px',
    },
    head: {
        backgroundColor: indigo[700],
        color: blueGrey[50],
    },
    table: {
        minWidth: 350,
    },
});

function DataTable(props) {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let headers = <TableRow>
            {props.columns.map((col) => <TableCell className={classes.head} align="center">{col.title}</TableCell>)}
        </TableRow>

    let rowsItems = props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => { return (
        <TableRow key={'row_' + index}>
            {
                props.columns.map((col) => <TableCell align="center">{row[col.id]}</TableCell>)
            }
        </TableRow>
    )});

    return (
        <Paper className={classes.root}>
            <h3>{props.title}</h3>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                        {headers}
                    </TableHead>
                    <TableBody>
                        {rowsItems}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                labelRowsPerPage={"Filas por página:"}
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                rowsPerPageOptions={[10, 25]}
                component="div"
                count={props.data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default DataTable;
