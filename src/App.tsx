import { useState } from 'react';

import { SearchForm } from 'modules/search-form';
import { MovieList } from 'modules/movies-list';
import { ModalShowVideo } from 'modules/video-modal';
import { FavoritePanel } from 'modules/favorite-panel';
import { MainPanelView } from 'modules/navbar';

import { VideosListContextProvider } from 'contexts/video-list-context';

import 'react-toastify/dist/ReactToastify.css';

import { AppStyle } from './index.styles';

export const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <div>
      <AppStyle {...{ modalIsOpen }}>
        <VideosListContextProvider>
          <FavoritePanel />
          <SearchForm />
          <MainPanelView />
          <MovieList />
          <ModalShowVideo {...{ setModalIsOpen }} />
        </VideosListContextProvider>
      </AppStyle>
    </div>
  );
};

export default App;
