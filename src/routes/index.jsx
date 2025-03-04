import Header from '@components/Header/Header';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('@pages/Home/Home'));
const CharacterDetail = lazy(
  () => import('@pages/CharacterDetail/CharacterDetail')
);

function AppRoutes() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
