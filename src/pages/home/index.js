import React from 'react';
import { useUser } from '../../hooks/use-user';

export default function Home() {
  const { user } = useUser();

  const component = <h1>{`Hola, ${user.name}!`}</h1>;

  const logeate = <h1>{`Hola, logueate maestro`}</h1>;

  return (
    <div>
      {user.name ? component : logeate}
    </div>
    );
}