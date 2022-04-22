import React, {useEffect, useState} from 'react';
import { useUser } from '../../hooks/use-user';
import {meetingHistory} from "../../services";
import DataTable from "../../components/dataTable";

export default function UserPage() {
  const { user, accessToken } = useUser();
  const [apiData, setApiData] = useState();


  useEffect(() => {
    meetingHistory(accessToken,
        (data) => setApiData(data)
        //() => true // Comentar arriba y descomentar aca para ver loading
    );
  }, []);



  const TableMeets = () => {
    if (apiData && apiData.meetings) {
      let title = "Reuniones en las que haz participado";
      let headers = [{
        id: 'title',
        title: 'Reuniones'
      }];

      return <DataTable title={title} columns={headers} data={apiData.meetings} />;
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
