import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='py-3 bg-secondary'>
      <div className='container flex justify-between'>
        <Link to='/'>
          <h1 className='text-white'>Movie App</h1>
        </Link>
        <div className='max-w-[40px]'>
          <img src='/user.png' alt='user' />
        </div>
      </div>
    </header>
  );
}
