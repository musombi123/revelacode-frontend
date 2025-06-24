import React from 'react';
import ReactDOM from 'react-dom/client';
// import Dashboard from './revela_code_dashboard'; // keep this for later
import TestTailwind from './TestTailwind';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <TestTailwind />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Did you forget the <div id='root'></div> in index.html?");
}

