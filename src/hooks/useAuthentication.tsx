import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
  dataAuthentication: Record<string, string>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const HOST = 'https://test.v5.pryaniky.com';

const postData = async ({ dataAuthentication, setToken }: Props) => {
  const respons = await fetch(`${HOST}/ru/data/v3/testmethods/docs/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataAuthentication),
  });

  const dataPost = await respons.json();

  setToken(dataPost.data.token);
  console.log('post', dataPost.data.token);

  return dataPost;
};

export default function useAuthentication() {
  // const { invalidateQueries, removeQueries } = useQueryClient();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['get token'],
    mutationFn: postData,
    onSuccess: () => {
      console.log('invalidateQueries');

      queryClient.invalidateQueries({ queryKey: ['data'] });
      queryClient.removeQueries({ queryKey: ['data'] });
    },
  });

  return { mutate };
}

// onSuccess: () => {
//   // ✅ refetch the comments list for our blog post
//   queryClient.invalidateQueries({
//     queryKey: ['posts', id, 'comments']
//   })
// },
