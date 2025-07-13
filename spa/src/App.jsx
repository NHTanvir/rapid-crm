import React from 'react';
import ReactDOM from 'react-dom/client';
import SettingsPage from './pages/SettingsPage';

const App = () => {
  return <SettingsPage />;
};

const container = document.getElementById("rapid-crm-settings-root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
