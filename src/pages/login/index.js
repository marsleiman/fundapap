import React from 'react';
import Login from '../../components/login';
import { useUser } from '../../hooks/use-user';

function LogIn() {
  const { user } = useUser();
  console.log('MARMAMEMRMAMRRMfdifshsd');

  return (
    <div>
      {user.name ? <h1>{`Hello, ${user.name}`}</h1> : <Login />}
    </div>
  );
}

export default LogIn;