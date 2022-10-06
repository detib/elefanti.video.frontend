import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.scss';
import About from './Pages/About/About';
import Home from './Pages/Home/Home';
import VideoPlayer from './Pages/VideoPlayer/VideoPlayer';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<div>404</div>} />
        
      </Routes>
    </Router>
  );
};

export default App;
