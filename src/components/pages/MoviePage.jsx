import { useParams } from 'react-router-dom';

export default function MoviePage() {
  let params = useParams();

  return (
    <div id='MoviePage' className='page'>
      <h1 className=''>Movie ID: {params.movieID}</h1>
      <h1 className=''>Title: </h1>
    </div>
  );
}
