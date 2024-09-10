import { useState } from 'react';
import './App.css';
import { useQueryClient } from '@tanstack/react-query';
import useRequestData from './hooks/useRequestData';
import useAuthentication from './hooks/useAuthentication';

const HOST = 'https://test.v5.pryaniky.com';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const dataAuthentication = {
    username: username,
    password: password,
  };

  const { data, error, isSuccess, isFetching } = useRequestData(token);
  const { mutate } = useAuthentication();
  const { invalidateQueries } = useQueryClient();

  async function postUser(e) {
    e.preventDefault();

    console.log(username, password);

    mutate({
      dataAuthentication,
      setToken,
    });
  }

  if (isFetching) console.log('isLoading');

  if (!isFetching) console.log('False isLoading');

  return (
    <>
      <h1>Query</h1>
      <div>
        <h2>Sign in</h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={(e) => postUser(e)}>Sign in</button>
        </form>
      </div>
      {data?.data?.length && <h2>Daaaa</h2>}
      {isFetching && <div>Loading...</div>}
    </>
  );
}

export default App;
