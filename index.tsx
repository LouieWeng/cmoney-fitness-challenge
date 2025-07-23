
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      {/* 你的其他組件 */}
      <Analytics />
    </>
  );
}

export default App;