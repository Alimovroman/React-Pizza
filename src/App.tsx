
import React, { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
// import Cart from './components/Pages/Cart/Cart';
// import FullPizza from './components/Pages/FullPizza/FullPizza';
// import NotFound from './components/Pages/NotFound/NotFound';
import PizzaBlockContainer from './components/Pages/Pizza-block/PizzaBlockContainer';
import './scss/app.scss';

const FullPizza = lazy(() => import(/*webpackChunkName: 'FullPizza'*/'./components/Pages/FullPizza/FullPizza'));
const Cart = lazy(() => import(/*webpackChunkName: 'Cart'*/'./components/Pages/Cart/Cart'));
const NotFound = lazy(() => import('./components/Pages/NotFound/NotFound'));

const App: React.FC = () => {

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Suspense fallback={<div>...loading</div>} >
          <Routes>
            <Route path='/' element={<PizzaBlockContainer />} />
            <Route path='/:id' element={<FullPizza />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
