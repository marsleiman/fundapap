import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useUser } from '../../hooks/use-user';
import {meetingHistory} from "../../services";
import {TablePagination} from "@mui/material";

export default function UserPage() {
  const { user, accessToken } = useUser();
  const [apiData, setApiData] = useState();

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  useEffect(() => {
    meetingHistory(accessToken,
        (data) => setApiData(data)
        //() => true // Comentar arriba y descomentar aca para ver loading
    );
  }, []);



  const TableMeets = () => {
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

    if (apiData && apiData.meetings) {
      return (
          <>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Reuniones Asistidas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiData.meetings.map((row) => (
                    <TableRow key={row.datetime}>
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
              labelRowsPerPage={"Filas por página:"}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={apiData.meetings.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      );
    } else {
      return '';
    }
  }


  return (
    <>
      {user.name ? <TableMeets /> : ''}
    </>
  );
}
