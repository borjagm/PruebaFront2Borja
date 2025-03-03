import React from 'react';
import AppRoutes from './routes/index.jsx';
import Header from '@components/Header/Header.jsx';
import { HeroesProvider } from '@context/HeroesContext.jsx';

import './App.scss';

function App() {
  return (
    <div className="app">
      <HeroesProvider>
        <Header />
        <div className="app-content">
          <AppRoutes />
        </div>
      </HeroesProvider>
    </div>
  );
}

export default App;
