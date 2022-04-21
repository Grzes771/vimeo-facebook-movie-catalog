import { Col, Row } from 'reactstrap';

import { Formular } from './modules/Form';
import { MainPanel } from './modules/MainPanel';
import { MovieList } from './modules/Movies/movies-list';
import { ModalShowVideo } from './modules/Modal';

import './App.css';
function App() {
  return (
    <div className="App">
      <Formular />
      <Row>
        <Col md="2">
          <MainPanel />
        </Col>
        <Col md="10">
          <MovieList />
        </Col>
      </Row>
      <ModalShowVideo />
    </div>
  );
}

export default App;
