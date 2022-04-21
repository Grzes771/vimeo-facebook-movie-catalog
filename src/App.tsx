import { useState } from 'react';
import { Col, Row } from 'reactstrap';

import { SearchForm } from './modules/search-form';
import { MainPanel } from './modules/main-panel';
import { MovieList } from './modules/movies-components/movies-list';
import { ModalShowVideo } from './modules/video-modal';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <div className="App">
      <SearchForm />
      <Row>
        <Col md="2">
          <MainPanel
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </Col>
        <Col md="10">
          <MovieList
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </Col>
      </Row>
      <ModalShowVideo />
    </div>
  );
};
export default App;
