import { useSelector } from 'react-redux';

import { SearchForm } from 'modules/search-form';
import { MovieList } from 'modules/movies-list';
import { ModalShowVideo } from 'modules/video-modal';
import { FavoritePanel } from 'modules/favorite-panel';
import { MainPanelView } from 'modules/navbar';

import { VideosListContextProvider } from 'contexts/video-list-context';

import { modalIsOpenRX } from 'store/modal/selectors';

import 'react-toastify/dist/ReactToastify.css';

import { AppStyle } from './index.styles';

export const App = () => {
  const isModalOpenedData = useSelector(modalIsOpenRX);

  return (
    <div>
      <AppStyle isModalOpen={isModalOpenedData}>
        <VideosListContextProvider>
          <FavoritePanel />
          <SearchForm />
          <MainPanelView />
          <MovieList />
        </VideosListContextProvider>
        <ModalShowVideo />
      </AppStyle>
    </div>
  );
};
export default App;
