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

  const buttomCustom = 
  <>
    <h2>{`Hola, ${user.name}!`}</h2>
    <span>{`Ya podés sumarte a la reunión del día de hoy`}</span>
    <a>'link'</a>
  </>;

  return (
    <div>
      {user.name ? buttomCustom : <Navigate to="/login" />}
    </div>
    );
}
