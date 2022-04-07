import React from 'react';
import { useUser } from '../../hooks/use-user';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function User() {
  const { user } = useUser();

  const component = <h1>{`PÁGINA DE USER, ${user.name}!`}</h1>;

  const logeate = <h1>{`Hola, logueate maestro`}</h1>;

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData(new Date().toDateString()),
    createData(new Date().toDateString()),
  ];

  const TableMeets = () => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Reuniones Asistidas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
  }


  return (
    <div>
      {user.name ? component : logeate}
      <TableMeets />
    </div>
    );
}
