import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.scss';
import About from './Pages/About/About';
import Home from './Pages/Home/Home';
import SignIn from './Pages/SignIn/SignIn.js';


const App = () => {
  return (
  
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='*' element={<div>404</div>} />
        
      </Routes>
    </Router>
  );
};

export default App;
