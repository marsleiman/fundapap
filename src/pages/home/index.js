import React, {useEffect, useState} from 'react';
import { useUser } from '../../hooks/use-user';
import { Navigate } from "react-router-dom";
import { nextMeetings } from "../../services";
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
    if (!user || !user.name) { //No esta logueado
      return <Navigate to="/login"/>
    } else if (apiData === undefined) { // Aun no cargo la api y hay que esperar
      return <Loading />
    } else { 
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
