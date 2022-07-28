import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React from 'react';
import './App.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Route, must be child of Routes element, never rendered directly. */}
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetails />} />
        </Routes>
      </div>
      <Footer />
    </Router >
  );
}

export default App;
