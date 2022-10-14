import './VideoCard.scss';
import '../styles/shared.scss';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns'

const VideoCard = (props) => {
  const date = new Date(props.createdOn)
  const VideoDateCreated = formatDistance(date, new Date());
  let description = props.description;
  if(description.length > 65) {
    description = props.description.substring(0, 64) + "...";
  }
  return (
    <Link to={props.to}>
      <div className='card'>
        <div className='card__actionArea flex-col'>
          <div className='card__media'>
            <img
              className='card__image'
              src={`https://img.youtube.com/vi/${props.id}/mqdefault.jpg`}
              alt='thumbnail'
            />
          </div>
          <div className='card__content flex-col'>
            <h2 className='card__title'>{props.title}</h2>
            <p className='card__description'>{description}</p>
            <p className='card__createdOn'>{VideoDateCreated} ago</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
