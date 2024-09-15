import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Data } from '../types';

const HOST = 'https://test.v5.pryaniky.com';

type Props = {
  token: string;
  id: string;
};

const postData = async ({ token, id }: Props) => {
  console.log('post BEFORE cahge data', token, id);
  const respons = await fetch(
    `${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': token,
      },
    }
  );

  const dataPost = await respons.json();
  console.log('post cahge data', dataPost);

  return dataPost;
};

export default function useDeleteData() {
  // const { invalidateQueries, removeQueries } = useQueryClient();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['delete'],
    mutationFn: postData,
    onSuccess: () => {
      console.log('Change data');

      queryClient.invalidateQueries({ queryKey: ['data'] });
      queryClient.removeQueries({ queryKey: ['data'] });
    },
  });

  return { mutate };
}
