import React, {useEffect, useState} from 'react';
import { useUser } from '../../hooks/use-user';
import { ScheduleMeeting } from 'react-schedule-meeting';
import { Navigate } from "react-router-dom";
import {nextMeetings} from "../../services";
import {Button, CircularProgress} from "@mui/material";
import {blueGrey, indigo} from "@mui/material/colors";


export default function Home() {
  const { user, accessToken } = useUser();
  const [apiData, setApiData] = useState();

  useEffect(() => {
      nextMeetings(accessToken,
          (data) => setApiData(data)
          //() => true // Comentar arriba y descomentar aca para ver loading
      );
  }, []);

  const render = () => {
    if (!user && !user.name) { //No esta logueado
      return <Navigate to="/login"/>
    } else if (apiData === undefined) { // Aun no cargo la api y hay que esperar
      return <div style={{margin: '10px', backgroundColor: indigo[700], color: blueGrey[50], padding: '5px'}}>
        <h3 style={{padding: '5px'}}><CircularProgress size="1rem"/> Cargando datos</h3>
      </div>;
    } else { //Ya esta la data de la api

      // Actual meeting
      let meetingMessage;
      if (apiData.current && apiData.current.length === 0) {
        meetingMessage = `Actualmente no hay ninguna reunión en curso, revisa el calendario y recuerda que podrás ingresar a partir de ${apiData.time_before} minutos antes.`;
      } else {
        // Textos de current meet
        let current = apiData.current[0];
        meetingMessage = <div>
          <h3>{current.title}</h3>
          <h4>Puedes unirte a la reunión en curso presionando aquí</h4>
          <Button variant="contained" color="primary" href={`/meet/${current.code}`}>
            Ir a la reunión
          </Button>
        </div>
      }

      //nextMeetings
      let nextMeetings;
      if (apiData.next.length > 0) {

        // Calendar
        /*
        const availableTimeslots = apiData.next.map((e) => {
          let start = Date.parse(e.datetime);
          let end = new Date(start + 2 * (60 * 60 * 1000) );
          return {
            id: e.title,
            startTime: start,
            endTime: end,
          };
        });
        nextMeetings = <>
          <ScheduleMeeting
              borderRadius={10}
              primaryColor="#3f5b85"
              eventDurationInMinutes={120}
              availableTimeslots={availableTimeslots}
              onStartTimeSelect={console.log}
          />
        </>
        */

        // Lista de meetings
        nextMeetings = apiData.next.map((elem) =>
              <div style={{margin: '10px', backgroundColor: indigo[700], color: blueGrey[50], padding: '5px'}}>
                <p style={{padding: '5px'}}>{elem.title}</p>
              </div>
        );
      }

      // Maqueta del contenido
      return <>
        <div style={{margin: '10px', backgroundColor: indigo[700], color: blueGrey[50], padding: '5px'}}>
          <p style={{padding: '5px'}}>{meetingMessage}</p>
        </div>
        <div>
          <h2>Revisa nuestro calendario para ver las siguientes reuniones</h2>
          {nextMeetings}
        </div>
      </>
    }
  }

  return render();

}
