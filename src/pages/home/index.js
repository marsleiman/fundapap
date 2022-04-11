import React from 'react';
import { useUser } from '../../hooks/use-user';
import { ScheduleMeeting } from 'react-schedule-meeting';
import { Navigate } from "react-router-dom";


// MOCK agenda
const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
  return {
    id,
    startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(10, 0, 0, 0)),
  };
});

const ScheduleMeetingComponent = () => {
  return (
      <ScheduleMeeting
          borderRadius={10}
          primaryColor="#3f5b85"
          eventDurationInMinutes={60}
          availableTimeslots={availableTimeslots}
          onStartTimeSelect={console.log}
      />
  )
}

export default function Home() {
  const { user } = useUser();

  const component = 
  <>
    <h1>{`Hola, ${user.name}!`}</h1>
    <ScheduleMeetingComponent />
  </>;

  /* Debería ser la data real
  async function createUser() {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        phoneNumber,
        country,
        password
      })
    }

    let response = await fetch('https://run.mocky.io/v3/c5d45ead-9ab5-4b3f-8748-65d3906d04b1', requestOptions)
      .then((res) => res.json())
      .catch(err => {
          console.log("Error: ", err)
      })
      return response;
  };
  */

  const bodyHome = <div>    
      <h2>{`Hola, ${user.name}!`}</h2>
      <span>{`Ya podés sumarte a la reunión del día de hoy`}</span>
      <a>'link'</a>;
    </div>

  const buttomCustom = (paramA) =>
  <>
    {paramA ? bodyHome : 'No hay una reunion actualmente'}
  </>;

  return (
    <div>
      {user.name ? buttomCustom : <Navigate to="/login" />}
    </div>
    );
}
