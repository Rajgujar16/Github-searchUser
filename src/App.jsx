import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/pages/Home/Home';
import User from './components/pages/User/User'; 

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<User />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
