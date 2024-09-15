import { useState } from 'react';
import './App.css';
import useRequestData from './hooks/useRequestData';
import useAuthentication from './hooks/useAuthentication';
import AccessibleTable from './components/table/AccessibleTable';
import SignIn from './components/signIn/SignIn';
import {
  IsValidNameContext,
  IsValidPasswordContext,
  SetNameContext,
  SetPasswordContext,
  TokenContext,
} from './context/Context';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isValidName, setIsValidName] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const { data, error, isSuccess, isFetching } = useRequestData(token);

  const dataAuthentication = {
    username: username,
    password: password,
  };

  const { mutate } = useAuthentication();

  async function handlePostUser(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const validationName = isValidation(/^user\d{1,2}$/, username);
    const validationPassword = isValidation(/^password$/, password);
    console.log(username, password);

    setIsValidName(validationName);
    setIsValidPassword(validationPassword);

    if (validationName && validationPassword) {
      mutate({
        dataAuthentication,
        setToken,
      });
    }
  }

  function isValidation(reg: RegExp, name: string): boolean {
    const validation = reg.test(name);

    return validation;
  }

  if (isFetching) console.log('isLoading');

  if (!isFetching) console.log('False isLoading');

  return (
    <>
      <TokenContext.Provider value={token}>
        <SetNameContext.Provider value={setUsername}>
          <SetPasswordContext.Provider value={setPassword}>
            <IsValidNameContext.Provider value={isValidName}>
              <IsValidPasswordContext.Provider value={isValidPassword}>
                <h1>Query</h1>
                {!data?.length && <SignIn handlePostUser={handlePostUser} />}
                {data?.length && <AccessibleTable data={data} />}
                {isFetching && <div>Loading...</div>}
              </IsValidPasswordContext.Provider>
            </IsValidNameContext.Provider>
          </SetPasswordContext.Provider>
        </SetNameContext.Provider>
      </TokenContext.Provider>
    </>
  );
}

export default App;
