import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import http from '../lib/Http.ts';
import type { moviceDetailsType } from '../model/movice.ts';
import { StarIcon, LikeIcon, FilmIcon, Calendar } from '../constants/icons';
import toast from '../lib/toast.ts';

export default function Movice() {
  const { moviceId } = useParams();
  const { isPending, error, data } = useQuery<moviceDetailsType>({
    queryKey: ['movice_details', moviceId],
    staleTime: 180,
    queryFn: async () => {
      try {
        const response = await http.get({ path: `&i=${moviceId}&Plot=full` });
        if (!response?.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return toast.error(error?.message);
      }
    }, // The query will not execute until the userId exists
    enabled: !!moviceId,
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
    <section className='pt-10 bg-primary min-h-[calc(100vh_-_64px)]'>
      <div className='grid md:grid-cols-[1fr,_300px] gap-4 container'>
        {/* <pre className='h-48 overflow-auto'>{JSON.stringify(data, null, 2)}</pre> */}
        <div className='row-start-2 md:row-start-auto'>
          <h1 className='text-4xl text-white font-semibold'>{data?.Title}</h1>
          <div className='flex items-center flex-wrap gap-3 mt-4'>
            <span className='text-white flex items-center gap-1'>
              <StarIcon className='text-orange-400 text-lg' /> IMDB Rating : {data?.imdbRating}
            </span>
            <span className='text-white flex items-center gap-1'>
              <LikeIcon className='text-blue-400 text-lg' /> IMDB Votes : {data?.imdbVotes}
            </span>
            <span className='text-white flex items-center gap-1'>
              <FilmIcon className='text-white text-lg' /> Runtime : {data?.Runtime}
            </span>
            <span className='text-white flex items-center gap-1'>
              <Calendar className='text-orange-400 text-lg' /> Year : {data?.Year}
            </span>
          </div>
          <p className='text-white pt-4'>{data?.Plot}</p>
          <div className='space-y-3 mt-9'>
            <div className='flex items-center gap-1 md:gap-2 text-white'>
              <span className='text-lg font-semibold'>Director</span>
              <span>{data?.Director}</span>
            </div>
            <div className='flex items-center gap-1 md:gap-2 text-white'>
              <span className='text-lg font-semibold'>Stars</span>
              <span>{data?.Actors}</span>
            </div>
            <div className='flex items-center gap-1 md:gap-2 text-white'>
              <span className='text-lg font-semibold'>Generes</span>
              <span>{data?.Genre}</span>
            </div>
            <div className='flex items-center gap-1 md:gap-2 text-white'>
              <span className='text-lg font-semibold'>Languages</span>
              <span>{data?.Language}</span>
            </div>
            <div className='flex items-center gap-1 md:gap-2 text-white'>
              <span className='text-lg font-semibold'>Awards</span>
              <span>{data?.Awards}</span>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <img src={data?.Poster} alt={data?.Title} />
        </div>
      </div>
    </section>
  );
}
