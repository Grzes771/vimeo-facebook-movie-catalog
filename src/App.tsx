import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SearchForm } from 'modules/search-form';
import { MovieList } from 'modules/movies-list';
import { VideoModal } from 'modules/video-modal';
import { FavoritePanel } from 'modules/favorite-panel';
import { MainPanelView } from 'modules/navbar';

import { VideosListContextProvider } from 'contexts/video-list-context';

import 'react-toastify/dist/ReactToastify.css';

import { AppStyle } from './index.styles';

export const VIMEO_YOUTUBE_MOVIE_CATALOG = 'vimeo-youtube-movie-catalog';

export const App = () => {
  const main = (
    <>
      <SearchForm />
      <MainPanelView />
      <MovieList />
    </>
  );
  return (
    <BrowserRouter>
      <AppStyle>
        <VideosListContextProvider>
          <FavoritePanel />
          <Routes>
            <Route
              path={VIMEO_YOUTUBE_MOVIE_CATALOG}
              element={main}
              key={VIMEO_YOUTUBE_MOVIE_CATALOG}
            />
          </Routes>
          <Routes>
            <Route
              path={`${VIMEO_YOUTUBE_MOVIE_CATALOG}/:movieId`}
              element={<VideoModal />}
              key="modal"
            />
          </Routes>
        </VideosListContextProvider>
      </AppStyle>
    </BrowserRouter>
  );
};

export default App;
