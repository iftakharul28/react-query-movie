import { Link } from 'react-router-dom';
import type { moviceCardType } from '../../model/movice';

export default function MoviceCard(props: moviceCardType) {
  return (
    <Link className=' bg-secondary max-w-full' to={`/movice/${props.imdbID}`}>
      <div className='max-h-72 h-full overflow-hidden'>
        <img className='h-full w-full' src={props.Poster} alt={props.Title} />
      </div>
      <div className='py-5 px-4 text-white'>
        <h4>{props.Title}</h4>
        <p>{props.Year}</p>
      </div>
    </Link>
  );
}
