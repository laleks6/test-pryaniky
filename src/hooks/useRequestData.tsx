import { useQuery } from '@tanstack/react-query';
import { Data } from '../types';

const HOST = 'https://test.v5.pryaniky.com';

const getData = async (token: string): Promise<Data[] | null> => {
  const respons = await fetch(
    `${HOST}/ru/data/v3/testmethods/docs/userdocs/get`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': token,
      },
    }
  );
  const dataGet = await respons.json();

  console.log('get ', token, dataGet);
  return dataGet.data;
};

export default function useRequestData(token: string) {
  const { data, error, isSuccess, isFetching } = useQuery({
    queryKey: ['data'],
    queryFn: () => getData(token),
  });

  return { data, error, isSuccess, isFetching };
}
