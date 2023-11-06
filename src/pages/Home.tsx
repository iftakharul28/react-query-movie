import HomeMoviceSection from '../components/section/HomeMoviceSection.tsx';
import HomeSerieSection from '../components/section/HomeSerieSection.tsx';

export default function HomePage() {
  const movies = ['John Wick', 'Mission Impossible', 'Harry Potter', 'James Bond'];
  const series = ['Friends', 'Loki'];
  return (
    <div className='py-9 bg-primary min-h-[calc(100vh_-_64px)]'>
      <div className='container'>
        {movies.map((movice, index) => (
          <HomeMoviceSection key={index} title={movice} />
        ))}
      </div>
      <div className='container'>
        {series.map((serie, index) => (
          <HomeSerieSection key={index} title={serie} />
        ))}
      </div>
    </div>
  );
}
