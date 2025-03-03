import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '@pages/Home/Home';
import CharacterDetail from '@pages/CharacterDetail/CharacterDetail';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;