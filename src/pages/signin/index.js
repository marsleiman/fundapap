import React from 'react';
import Signin from '../../components/signin';
import { useUser } from '../../hooks/use-user';

function SignIn() {
  const { user } = useUser();

  return (
    <div>
      {user && user.name ? <h1>{`Hello, ${user.name}`}</h1> : <Signin />}
    </div>
  );
}

export default SignIn;