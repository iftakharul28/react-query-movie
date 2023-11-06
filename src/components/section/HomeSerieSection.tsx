import { useQuery } from '@tanstack/react-query';
import toast from '../../lib/toast';
import MoviceCard from '../card/MoviceCard';
import http from '../../lib/Http';
import type { moviceCardType } from '../../model/movice';

type Props = {
  title: string;
};
export default function HomeSerieSection(props: Props) {
  const {
    isPending,
    error,
    data: list,
  } = useQuery<{ Search: moviceCardType[] }>({
    queryKey: [`${props.title}`],
    staleTime: 180,
    queryFn: async () => {
      try {
        const response = await http.get({ path: `&s=${props.title}&type=series` });
        if (!response?.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return toast.error(error?.message);
      }
    },
  });

  if (isPending) {
    return (
      <section className='pt-9 bg-primary min-h-[60px] grid place-items-center'>
        <p className='text-xl text-white'>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className='pt-9 bg-primary min-h-[calc(60px)] grid place-items-center'>
        <p className='text-xl text-white'>{'An error has occurred: ' + error}</p>
      </section>
    );
  }
  return (
    <section className='pb-10'>
      <h2 className='text-4xl text-white font-semibold pb-6'>{props.title}</h2>
      <div className='grid grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] gap-3'>
        {list?.Search.map((movice) => (
          <MoviceCard key={movice.imdbID} {...movice} />
        ))}
      </div>
    </section>
  );
}
