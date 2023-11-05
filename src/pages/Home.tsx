import { useQuery } from '@tanstack/react-query';
// import toast from '../lib/toast';
import http from '../lib/Http';
import { moviceCardType } from '../model/movice';
import MoviceCard from '../components/card/MoviceCard';

export default function HomePage() {
  const { isPending, error, data } = useQuery<{ Search: moviceCardType[] }>({
    queryKey: ['seriesData'],
    staleTime: 180,
    queryFn: async () => {
      try {
        const response = await http.get({ path: `&s=Friends&type=series` });
        if (!response?.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      } catch (error) {
        return error;
      }
    },
  });
  const { data: list } = useQuery<{ Search: moviceCardType[] }>({
    queryKey: ['harryData'],
    staleTime: 180,
    queryFn: async () => {
      try {
        const response = await http.get({ path: `&s=Harry&type=movie` });
        if (!response?.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      } catch (error) {
        return error;
      }
    },
  });

  if (isPending) {
    return (
      <section className='pt-9 bg-primary min-h-[calc(100vh_-_64px)] grid place-items-center'>
        <p className='text-xl text-white'>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className='pt-9 bg-primary min-h-[calc(100vh_-_64px)] grid place-items-center'>
        <p className='text-xl text-white'>{'An error has occurred: ' + error}</p>
      </section>
    );
  }
  return (
    <div className='py-9 bg-primary min-h-[calc(100vh_-_64px)]'>
      <div className='container grid grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] gap-3 pb-10'>
        {list?.Search.map((movice) => (
          <MoviceCard key={movice.imdbID} {...movice} />
        ))}
      </div>
      <div className='container grid grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] gap-3'>
        {data?.Search.map((movice) => (
          <MoviceCard key={movice.imdbID} {...movice} />
        ))}
      </div>
      {/* <button
        type='button'
        onClick={() =>
          toast.success({
            position: { x: 'right', y: 'top' },
            message: 'hello world',
            duration: 3000,
          })
        }>
        say hello
      </button> */}
    </div>
  );
}
