import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MovieReviews({ reviews }) {
  return (
    <div className=''>
      <div className='reviewBox'>
        {reviews.length > 0 ? (
          reviews.map((rev, i) => (
            <div key={i} className='review'>
              <div>{rev.userName}</div>
              <div>
                <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                {rev.stars} stars
              </div>
              <div style={{ fontStyle: 'italic' }}>
                {rev.text && `"${rev.text}"`}
              </div>
            </div>
          ))
        ) : (
          <h3>There are no reviews for this movie yet.</h3>
        )}
      </div>
    </div>
  );
}
