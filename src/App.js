
import React, { useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Cart from './components/Pages/Cart/Cart';
import NotFound from './components/Pages/NotFound/NotFound';
import PizzaBlockContainer from './components/Pages/Pizza-block/PizzaBlockContainer';
import './scss/app.scss';


export const SearchContext = React.createContext();

function App(props) {
 
  const [searchValue, setSearchValue] = useState('')
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header/>
        <div className="content">
          <Routes>
            <Route path='/' element={<PizzaBlockContainer />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
