import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import http from '../lib/Http.ts';
import type { moviceDetailsType } from '../model/movice.ts';
import StarIcon from '../constants/icons/StarIcon.tsx';
import LikeIcon from '../constants/icons/LikeIcon.tsx';
import FilmIcon from '../constants/icons/LikeIcon.tsx';
import Calendar from '../constants/icons/Calendar.tsx';

export default function Movice() {
  const { moviceId } = useParams();
  const { isPending, error, data } = useQuery<moviceDetailsType>({
    queryKey: ['repoData', moviceId],
    staleTime: 180,
    queryFn: async () => {
      if (!moviceId) return;
      try {
        const response = await http.get({ path: `&i=${moviceId}&Plot=full` });
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
    <section className='pt-9 bg-primary min-h-[calc(100vh_-_64px)]'>
      <div className='grid grid-cols-[1fr,_300px] gap-4 container'>
        {/* <pre className='h-48 overflow-auto'>{JSON.stringify(data, null, 2)}</pre> */}
        <div className='section-left'>
          <h1 className='text-4xl text-white'>{data?.Title}</h1>
          <div className='flex items-center gap-3'>
            <span className='text-white flex items-center gap-1'>
              IMDB Rating <StarIcon className='text-white' /> : {data?.imdbRating}
            </span>
            <span className='text-white flex items-center gap-1'>
              IMDB Votes <LikeIcon className='text-white' /> : {data?.imdbVotes}
            </span>
            <span className='text-white flex items-center gap-1'>
              Runtime <FilmIcon className='text-white' /> : {data?.Runtime}
            </span>
            <span className='text-white flex items-center gap-1'>
              Year <Calendar className='text-white' /> : {data?.Year}
            </span>
          </div>
          <p className='text-white pt-4'>{data?.Plot}</p>
          <div className='space-y-3 mt-9'>
            <div className='flex items-center gap-1 text-white'>
              <span className='text-lg font-semibold'>Director</span>
              <span>{data?.Director}</span>
            </div>
            <div className='flex items-center gap-1 text-white'>
              <span className='text-lg font-semibold'>Stars</span>
              <span>{data?.Actors}</span>
            </div>
            <div className='flex items-center gap-1 text-white'>
              <span className='text-lg font-semibold'>Generes</span>
              <span>{data?.Genre}</span>
            </div>
            <div className='flex items-center gap-1 text-white'>
              <span className='text-lg font-semibold'>Languages</span>
              <span>{data?.Language}</span>
            </div>
            <div className='flex items-center gap-1 text-white'>
              <span className='text-lg font-semibold'>Awards</span>
              <span>{data?.Awards}</span>
            </div>
          </div>
        </div>
        <div className='section-right'>
          <img src={data?.Poster} alt={data?.Title} />
        </div>
      </div>
    </section>
  );
}
