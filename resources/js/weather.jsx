import React from 'react';
import ReactDOM from 'react-dom/client';

import Weather from './components/Weather';

const mount = document.getElementById('weather-app');

if (mount) {
  ReactDOM.createRoot(mount).render(
    <React.StrictMode>
      <Weather />
    </React.StrictMode>
  );
}
