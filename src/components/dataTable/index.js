import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableContainer from "@material-ui/core/TableContainer";
import { TablePagination } from "@mui/material";
import React from "react";

function DataTable(props) {
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
            {props.columns.map((col) => <TableCell align="center">{col.title}</TableCell>)}
        </TableRow>

    let rowsItems = props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => { return (
        <TableRow key={'row_' + index}>
            {
                props.columns.map((col) => <TableCell align="center">{row[col.id]}</TableCell>)
            }
        </TableRow>
    )});

    return (
      <div className="content-data-table">
        <Paper>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="simple table">
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
      </div>
    );
}

export default DataTable;
