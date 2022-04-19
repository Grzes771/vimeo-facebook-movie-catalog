import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Col, Row } from 'reactstrap';
import './App.css';
import { Formular } from './modules/Form/Form';
import { MainPanel } from './modules/MainPanel/MainPanel';
import { MovieList } from './modules/Movies/MoviesList';
import useLocalStorage from './helpers/useLocalStorage';



function App() {
  
  const [videosLocalContainer, setVideosLocalContainer] = useLocalStorage('videosLocalStorage', [])
useEffect(() => {

 console.log(videosLocalContainer)
  },[])

    const [panelData, setPanelData] = useState({
    display: 'vertical',
    favorite: 'all',
    order: 'newest',
    });
  
  return (
    <div className="App">
      <Formular videosLocalContainer={videosLocalContainer}
            setVideosLocalContainer={setVideosLocalContainer}/>
      <Row>
        <Col md="2"><MainPanel setPanelData={setPanelData} setVideosLocalContainer={setVideosLocalContainer }/></Col>
        <Col md="10">
          <MovieList panelData={panelData} videosLocalContainer={videosLocalContainer}
            setVideosLocalContainer={setVideosLocalContainer}/>
        </Col>
      </Row>
      
    </div>
  );
}

export default App;
