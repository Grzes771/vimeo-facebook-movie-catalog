import React, {
  useEffect,
  useState,
    useCallback,

} from 'react';
import './style.css';
import { SingleMovie } from './SingleMovie';
import { InputValues } from '../../types/types';


export const MovieList = (props:any) => {
 const {panelData, videosLocalContainer,
            setVideosLocalContainer} = props
    
    const [inputValues, setInputValues] = useState<InputValues>({
    display: 'vertical',
    favorite: 'all',
    order: 'newest',
  });
    
    useEffect(() => {
    setInputValues({
      display: panelData.display,
      favorite: panelData.favorite,
      order: panelData.order,
    });
  }, [panelData]);
    
// @ts-ignore
    const LocalStorageVideosConverted = JSON.parse(window.localStorage.getItem('videosLocalStorage'))

   
    const FilterAndSort = ((inputValues.order === 'oldest')
    ? LocalStorageVideosConverted.sort((a:any, b:any) => a.date - b.date)
    : LocalStorageVideosConverted.sort((a:any, b:any) => b.date - a.date)
  ).filter((movie:any) => ((inputValues.favorite === 'favorite')
    ? movie.favorite
    : movie
  ));
    
    const DisplayYoutubeMovies = FilterAndSort.map((movie: any) => (
        <SingleMovie movie={movie} videosLocalContainer={videosLocalContainer}
            setVideosLocalContainer={setVideosLocalContainer} inputValues={inputValues} />
    ))

  return (
    <div>
      <div className="movies-container">
              {DisplayYoutubeMovies}
      </div>
    </div>
  );
};
export default MovieList;