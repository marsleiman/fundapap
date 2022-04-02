import React from 'react';
import { useUser } from '../../hooks/use-user';

function Meet() {
  const { user } = useUser();

  const component = <h1>{`PÁGINA DEL MEET, ${user.name}!`}</h1>;

  const logeate = <h1>{`Hola, logueate maestro`}</h1>;

  return (
    <div>
      {user.name ? component : logeate}
    </div>
    );
}

export default Meet;