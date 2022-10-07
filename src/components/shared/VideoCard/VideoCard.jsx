import "./VideoCard.scss";
import { Link } from 'react-router-dom'

export const VideoCard = (props) => {
  return (
    <Link>
      <div className="card">
        <div className="card__actionArea">
          <div className="card__media">
            <img
              className="card__image"
              src={`https://img.youtube.com/vi/${props.id}/maxresdefault.jpg`}
              alt=""
            />
          </div>
          <div className="card__content">
            <h2 className="card__title">Title: {props.title}</h2>
            <h3 className="card__author">Author: {props.author}</h3>
            <p className="card__description">Description: {props.description}</p>
            <p className="card__timestamp">{props.timestamp}</p>
            <p className="card__createdOn">Published: {props.createdOn}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
