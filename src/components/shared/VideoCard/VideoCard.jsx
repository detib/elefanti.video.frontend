import "./VideoCard.scss";
import { Link } from 'react-router-dom'

function VideoCard (props){
  return (
    <Link>
      <div className="card">
        <div className="card__actionArea">
          <div className="card__media">
            <img
              className="card__image"
              src={`https://img.youtube.com/vi/${props.id}/mqdefault.jpg`}
              alt="thumbnail"
            />
          </div>
          <div className="card__content">
            <h2 className="card__title">{props.title}</h2>
            <p className="card__description">{props.description}</p>
            <p className="card__timestamp">{props.timestamp}</p>
            <p className="card__createdOn">{props.createdOn}</p>
          </div>
        </div>
      </div>
    </Link>

    /*
      <VideoCard id="przDcQe6n5o" title=""/>
        <VideoCard id="N7N4EC20-cM"/>
        <VideoCard id="QZ0cpBocl3c"/>
        <VideoCard id="TusQWn2TQxQ"/> 
    */
  );
};

export default VideoCard;
