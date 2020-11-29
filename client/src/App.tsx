import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import MBTIRouter from './routers/MBTIRouter'

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <MBTIRouter />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
