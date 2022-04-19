import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useUser } from '../../hooks/use-user';
import {useParams} from "react-router-dom";
import {getMeeting} from "../../services";
import {blueGrey, indigo} from "@mui/material/colors";
import {Button, CircularProgress, TableCell, TablePagination} from "@mui/material";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function Meet() {
  const classes = useStyles();
  const { user, accessToken } = useUser();
  const { uuid } = useParams();
  const [apiData, setApiData] = useState();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    if (uuid) {
      getMeeting(accessToken,
          uuid,
          (data) => setApiData(data)
          //() => true // Comentar arriba y descomentar aca para ver loading
      );
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!user && !user.name) {
    return ''
  } else  if (apiData === undefined) { // Aun no cargo la api y hay que esperar
    return <div style={{margin: '10px', backgroundColor: indigo[700], color: blueGrey[50], padding: '5px'}}>
      <h3 style={{padding: '5px'}}><CircularProgress size="1rem"/> Cargando datos</h3>
    </div>;
  } else { //Ya esta la data de la api

    //Meeting
    let meeting;
    if (!apiData.meeting) {
      <h3>La reunión a la que intenta acceder parece no estar disponible en este momento</h3>
    } else {
      meeting = <>
        <img src={"/image1.jpg"} style={{height: '150px', width: '100%', objectFit: 'cover'}} alt={"Imagen"}/>
        <h2>{apiData.meeting.title}</h2>
        <h3>{apiData.meeting.description}</h3>
        <a target="_blank" href={apiData.meeting.link}>
          <Button variant="contained" color="primary">
            Link a la reunión
          </Button>
        </a>
      </>
    }

    let users;
    if (apiData.users) {
      let newusers = apiData.users.new.map(
          (elem) => { return { category: "Nuevo Participante", name: elem.firstname + " " + elem.lastname }}
      );

      let participants = apiData.users.not_new.map(
            (elem) => { return { category: "Participante", name: elem.firstname + " " + elem.lastname }}
      );

      let organizers = apiData.users.organizer.map(
            (elem) => { return { category: "Organizador", name: elem.firstname + " " + elem.lastname }}
        );
      console.log(organizers);

      let rows = [...newusers, ...participants, ...organizers];

      users = <>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align={"center"}>Categoria</TableCell>
                <TableCell align={"center"}>Nombre</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                    <TableRow hover key={row.name}>
                      <TableCell align="left">{row.category}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                    </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
            labelRowsPerPage={"Filas por página:"}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    }

    return <>
      {meeting}
      {users}
    </>

  }

}

export default Meet;