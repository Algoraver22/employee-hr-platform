import React from 'react';
import './App.css';
import './index.css';
import './bootstrap-replacement.css';
import SimpleApp from './Components/SimpleApp';
import ErrorBoundary from './Components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <SimpleApp />
        
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
