import React from 'react';
import AppRoutes from './routes/index.jsx';
import { HeroesProvider } from '@context/HeroesContext.jsx';

import './App.scss';

function App() {
  return (
    <div className="app">
      <HeroesProvider>
          <AppRoutes />
      </HeroesProvider>
    </div>
  );
}

export default App;
