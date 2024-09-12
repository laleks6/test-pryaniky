import { useState } from 'react';
import './App.css';
import useRequestData from './hooks/useRequestData';
import useAuthentication from './hooks/useAuthentication';
import AccessibleTable from './components/table/AccessibleTable';
import SignIn from './components/signIn/SignIn';

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

  async function postUser(e: React.ChangeEvent<HTMLInputElement>) {
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
      {!data?.length && (
        <SignIn
          setUsername={setUsername}
          setPassword={setPassword}
          postUser={postUser}
        />
      )}
      {data?.length && <AccessibleTable data={data} />}
      {isFetching && <div>Loading...</div>}
    </>
  );
}

export default App;
