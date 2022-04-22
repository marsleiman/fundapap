import React, {useEffect, useState} from 'react';
import { useUser } from '../../hooks/use-user';
import { Navigate } from "react-router-dom";
import {nextMeetings} from "../../services";
import {Button} from "@mui/material";
import {blueGrey, indigo} from "@mui/material/colors";
import Loading from "../../components/loading";
import Highlight from "./highlight";
import Calendar from "./calendar";


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
      return <Loading />
    } else { //Ya esta la data de la api

      // Actual meeting
      let meetingMessage;
      if (apiData.current && apiData.current.length === 0) {
        let title = `Actualmente no hay ninguna reunión en curso`;
        let subtitle = `Encontrarás el link para ingresar aqui, a partir de ${apiData.time_before} minutos antes del inicio.`;
        meetingMessage = <Highlight title={title} subtitle={subtitle} />;
      } else {
        // Textos de current meet
        let current = apiData.current[0];
        meetingMessage = <Highlight title={current.title} subtitle={'Puedes unirte a la reunión presionando en el siguiente boton'}
          button={{
            text: "Ir a la reunión",
            href: `/meet/${current.code}`,
          }}
        />
      }

      //nextMeetings
      let nextMeetings;
      if (apiData.next.length > 0) {
        nextMeetings = <Calendar nexts={apiData.next}/>
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
        /*
        nextMeetings = apiData.next.map((elem) =>
              <div style={{margin: '10px', backgroundColor: indigo[700], color: blueGrey[50], padding: '5px'}}>
                <p style={{padding: '5px'}}>{elem.title}</p>
              </div>
        );*/
      }

      // Maqueta del contenido
      return <>
        {meetingMessage}
        {nextMeetings}
      </>
    }
  }

  return render();

}
