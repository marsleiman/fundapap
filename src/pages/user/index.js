import React from 'react';
import { useUser } from '../../hooks/use-user';

export default function User() {
  const { user } = useUser();

  const component = <h1>{`PÁGINA DE USER, ${user.name}!`}</h1>;

  const logeate = <h1>{`Hola, logueate maestro`}</h1>;

  return (
    <div>
      {user.name ? component : logeate}
    </div>
    );
}
