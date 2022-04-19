
import React from 'react';
import {
  Card,
  CardImg,
  CardTitle,
  CardFooter,
  CardHeader,
  CardBody,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock, faEye, faStar, faTrashAlt, faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { VideosData } from '../../types/types';
import { ModalData } from '../../types/types';
import { InputValues } from '../../types/types';
import { Video } from '../../types/types';


export const SingleMovie = (props:any) => {
   const {movie, videosLocalContainer, setVideosLocalContainer, inputValues} = props

  const addFavorite = (id: number) => {
    const setFavorite = ((video : any) => {
      if (video.date === id) {
        video.favorite = !video.favorite;
        return video;
      }
      return video;
    });
const favoriteVideosData = videosLocalContainer.map(setFavorite)
    setVideosLocalContainer(favoriteVideosData)
  };

  const remove = (id: number) => {
    const filterById = (video: Video | VideosData) => video.date !== id;
    const filteredVideosData: VideosData[] = videosLocalContainer.filter(filterById);
    setVideosLocalContainer(filteredVideosData);
  };

  
  return (
        <Card data-testid="card" className={`data-slice ${inputValues.display === 'vertical' ? 'card-horizontal' : ''}`}>
      <CardHeader>
        <CardTitle tag="h4">{movie.title}</CardTitle>
      </CardHeader>
      <CardBody className={`${inputValues.display === 'vertical' ? '' : 'card-body-horizontal'}`}>
        <CardImg
          top
          width="100%"
          src={movie.thumbNails}
          alt="thubnail"
        />
      </CardBody>
      <CardFooter className="text-muted">
        <span>
          <FontAwesomeIcon icon={faEye} />
          {` ${movie.viewsCount}`}
        </span>
        {movie.likes && (
        <span>
          <FontAwesomeIcon icon={faThumbsUp} />
          {` ${movie.likes}`}
        </span>
        )}
        <span>
          <FontAwesomeIcon icon={faClock} />
          {` ${new Date(movie.date).toLocaleString().split(',')[0]}`}
        </span>
        <span>
          <FontAwesomeIcon
            data-testid="remove-icon"
            icon={faTrashAlt}  
            onClick={() => remove(movie.date)}
          />
        </span>
        <span>
          <FontAwesomeIcon
            icon={faStar}
                        className={`${movie.favorite ? 'active-star' : ''}`}
                       onClick={() => addFavorite(movie.date)}
        
          />
        </span>
      </CardFooter>
    </Card>
  );
};
