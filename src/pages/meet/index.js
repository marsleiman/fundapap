import React from 'react';
import { useUser } from '../../hooks/use-user';
import { Link } from "react-router-dom";

function Meet() {
  const { user } = useUser();

  const component = 
  <>
    <h1>{`${user.name}, podrás acceder a la sala hasta 15 minutos antes de que comience`}</h1>
    <Link to="/#">url</Link>
  </>;

  return (
    <div>
      {user && user.name ? component : ''}
    </div>
    );
}

export default Meet;