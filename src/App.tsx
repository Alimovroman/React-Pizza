
import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Cart from './components/Pages/Cart/Cart';
import FullPizza from './components/Pages/FullPizza/FullPizza';
import NotFound from './components/Pages/NotFound/NotFound';
import PizzaBlockContainer from './components/Pages/Pizza-block/PizzaBlockContainer';
import './scss/app.scss';

const App:React.FC = () => {

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<PizzaBlockContainer />} />
          <Route path='/:id' element={<FullPizza />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
