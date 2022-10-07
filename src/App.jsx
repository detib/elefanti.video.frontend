import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.scss';
import About from './Pages/About/About';
import Home from './Pages/Home/Home';
import SignUp from './components/pages/SignUp';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </Router>
  );
};

export default App;
