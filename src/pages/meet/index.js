import React, {useEffect, useState} from 'react';
import { useUser } from '../../hooks/use-user';
import { useParams } from "react-router-dom";
import { getMeeting } from "../../services";
import Loading from "../../components/loading";
import DataTable from "../../components/dataTable";

function Meet() {
  const { user, accessToken } = useUser();
  const { uuid } = useParams();
  const [apiData, setApiData] = useState();

  useEffect(() => {
    if (uuid) {
      getMeeting(accessToken,
          uuid,
          (data) => setApiData(data)
      );
    }
  }, []);


  if (!user || !user.name) {
    return ''
  } else  if (apiData === undefined) { // Aun no cargo la api y hay que esperar
    return <Loading />
  } else { //Ya esta la data de la api

    //Meeting
    let meeting;
    if (!apiData.meeting) {
      <h3>La reunión a la que intenta acceder parece no estar disponible en este momento</h3>
    } else {
      meeting = <>
        <img src={"/image1.jpg"} style={{height: '150px', width: '100%', objectFit: 'cover'}} alt={"Imagen"}/>
        <h2 className="meet-link-title">{apiData.meeting.title}</h2>
        <span className="child_h4_highlight">{apiData.meeting.description}</span>
        <a className="meet-link" target="_blank" href={apiData.meeting.link}>Link a la reunión</a>
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

      let header = [
        {
          id: 'category',
          title: 'Categoría'
        },
        {
          id: 'name',
          title: 'Nombre'
        }
      ]
      let rows = [...newusers, ...participants, ...organizers];
      let title = "Participantes";

      users = <DataTable title={title} columns={header} data={rows} />;
    }

    return <>
      {meeting}
      {users}
    </>

  }

}

export default Meet;