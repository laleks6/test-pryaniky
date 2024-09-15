import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Data } from '../types';

const HOST = 'https://test.v5.pryaniky.com';

type Props = {
  data: Data;
  token: string;
  id: string;
};

const postData = async ({ data, token, id }: Props) => {
  console.log('post BEFORE cahge data', token, data, id);
  const respons = await fetch(
    `${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': token,
      },
      body: JSON.stringify(data),
    }
  );

  const dataPost = await respons.json();
  console.log('post cahge data', dataPost);

  return dataPost;
};

export default function useChangeData() {
  // const { invalidateQueries, removeQueries } = useQueryClient();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['change'],
    mutationFn: postData,
    onSuccess: () => {
      console.log('Change data');

      queryClient.invalidateQueries({ queryKey: ['data'] });
      queryClient.removeQueries({ queryKey: ['data'] });
    },
  });

  return { mutate };
}
