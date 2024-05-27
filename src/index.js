import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import CadDespesa from './pages/cad-despesa/cad-despesa.jsx';
import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<BrowserRouter>
  <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/despesa/:idUrl' element={<CadDespesa/>}/>
  </Routes>

</BrowserRouter>

);


