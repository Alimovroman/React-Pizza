import Categories from '../../Categories/Categories';
import PizzaBlock from './Pizza-block';
import Sort from '../../Sort/Sort';
import { useEffect, useState } from 'react';
import SkeletonLoader from '../../../assets/SkeletonReact/SkeletonReact';
import Paginate from '../../Paginate/Paginate';
import { useDispatch, useSelector } from 'react-redux';
import { changeQueryParam, mainSelector, setPageNumber, sortSelector } from '../../../state/main-reducer';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { getPizzas, pizzaItemSelector, PizzaType } from '../../../state/pizzas-reducer';
import React from 'react';
import { AppDispatch } from '../../../state/store';

 export type EventTypePaginate = {
  selected: number
}

const PizzaBlockContainer: React.FC = () => {
  const { pizzaCategory, pageNumber, searchValue } = useSelector(mainSelector);
  const { sortNumber, sortParam } = useSelector(sortSelector);
  const { pizzasItems, status } = useSelector(pizzaItemSelector)
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isFetching = useRef(false);
  const isMounted = useRef(false);
  
  const filterFetch = async () => {
    let search = searchValue !== '' ? `name=${searchValue}` : '';
    let pagination = `page=${pageNumber}&limit=4`;
    let category = pizzaCategory === 0 ? '' : `category=${pizzaCategory}`;
    let sortBy = `sortBy=${sortParam[sortNumber]}`;
    console.log(isLoad) // Удалить в будущем
    setIsLoad(false)
    
      //let response = await axios.get(`https://62a5c5ab430ba53411cc40f9.mockapi.io/items?${category}&${search}&${sortBy}&${pagination}`)
      dispatch(getPizzas({search, pagination, category, sortBy}))

       setIsLoad(true);
    
  }

  useEffect(() => {
    if (window.location.search) {
      let param: {pageNumber?: string, pizzaCategory?:string, sortNumber?: string} = qs.parse((window.location.search.substring(1)));
      dispatch(changeQueryParam(param));
      isFetching.current = true;
    }
  }, [])

  useEffect(() => {
    if (!isFetching.current) {
      filterFetch();
    };
    window.scrollTo(0, 0);
    isFetching.current = false;
  }, [isFetching, sortNumber, pizzaCategory, searchValue, pageNumber]);

  useEffect(() => {
    if (isMounted.current) {
      let queryString = qs.stringify({
        pizzaCategory,
        pageNumber,
        sortNumber
      })
      navigate(`?${queryString}`);
    }
    isMounted.current = true;

    //setSearchParams({pizzaCategory, pageNumber, sortNumber})
  }, [pizzaCategory, pageNumber, sortNumber])

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={pizzaCategory} />
        <Sort sortNumber={sortNumber} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        { status === 'loading' && [...new Array(6)].map((_, i) => <SkeletonLoader key={i} />) }
        { status === 'success' && pizzasItems.map((obj: PizzaType) => {
            return <PizzaBlock key={obj.id} {...obj} />
          })
        }
        { status === 'error' && <div>
            <h2>Произошла Ошибка</h2>
            <p>К сожалению не удалось загрузить пиццы, попробуйте загрузить страницу позже</p>
          </div>}
      </div>
      
      <Paginate handlePageClick={(e:EventTypePaginate) => dispatch(setPageNumber(e.selected+ 1))} />
    </div>
  )
};

export default PizzaBlockContainer;