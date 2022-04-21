import {
  Card,
  CardImg,
  CardTitle,
  CardFooter,
  CardHeader,
  CardBody,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setInputDataRX } from '../../../store/change-panel-values/selector';
import { addItemToLS, removeItemFromLS } from '../../../helpers/local-storage';
import {
  deleteSingleYoutubeVideo,
  setYtFavorite,
} from '../../../store/get-youtube-videos/actions';
import { TVideosArrItem } from '../../../store/types/movie-item';
import {
  deleteSingleVimeoVideo,
  setVimeoFavorite,
} from '../../../store/get-vimeo-videos/actions';
import { setModalActive, setVideoDetails } from '../../../store/modal/actions';

import {
  faClock,
  faEye,
  faStar,
  faTrashAlt,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import './style.css';

type TSingleMovie = {
  movie: TVideosArrItem;
};

export const SingleMovie = ({ movie }: TSingleMovie) => {
  const dispatch = useDispatch();

  const handleFavoriteInStore = (movie: TVideosArrItem) => {
    if (movie.platform === 'youtube') dispatch(setYtFavorite(movie.path));
    else dispatch(setVimeoFavorite(movie.path));
  };

  const addFavorite = (movie: TVideosArrItem) => {
    addItemToLS(movie);
    handleFavoriteInStore(movie);
  };

  const removeFromFavorite = (movie: TVideosArrItem) => {
    removeItemFromLS(movie);
    handleFavoriteInStore(movie);
  };

  const showDisplayInputStoreValue = useSelector(setInputDataRX);
  const showDisplayInputValue = {
    display: showDisplayInputStoreValue.display,
  };
  const handleOpenModal = () => {
    dispatch(setModalActive(true));
    dispatch(setVideoDetails(movie));
  };
  const handleDeleteSingleMovie = () => {
    dispatch(deleteSingleYoutubeVideo(movie));
    dispatch(deleteSingleVimeoVideo(movie));
  };
  return (
    <Card
      data-testid="card"
      className={`data-slice ${
        showDisplayInputValue.display === 'vertical' ? 'card-horizontal' : ''
      }`}
    >
      <CardHeader>
        <CardTitle tag="h4">{movie.title}</CardTitle>
      </CardHeader>
      <CardBody
        className={`${
          showDisplayInputValue.display === 'vertical'
            ? ''
            : 'card-body-horizontal'
        }`}
      >
        <CardImg
          top
          width="100%"
          src={movie.thumbNails}
          alt="thubnail"
          onClick={handleOpenModal}
        />
      </CardBody>
      <CardFooter className="text-muted">
        {movie.viewsCount && (
          <span>
            <FontAwesomeIcon icon={faEye} />
            {` ${movie.viewsCount}`}
          </span>
        )}
        {movie.likes && (
          <span>
            <FontAwesomeIcon icon={faThumbsUp} />
            {` ${movie.likes}`}
          </span>
        )}
        <span>
          <FontAwesomeIcon icon={faClock} />
          {`${new Date(movie.date).toLocaleString()}`}
        </span>
        <span>
          <FontAwesomeIcon
            data-testid="remove-icon"
            icon={faTrashAlt}
            onClick={handleDeleteSingleMovie}
          />
        </span>
        <span>
          <FontAwesomeIcon
            icon={faStar}
            className={`${movie.favorite ? 'active-star' : ''}`}
            onClick={() => {
              if (!movie.favorite) addFavorite(movie);
              else removeFromFavorite(movie);
            }}
          />
        </span>
      </CardFooter>
    </Card>
  );
};
