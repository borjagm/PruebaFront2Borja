import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('@pages/Home/Home'));
const CharacterDetail = lazy(
  () => import('@pages/CharacterDetail/CharacterDetail')
);

function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
