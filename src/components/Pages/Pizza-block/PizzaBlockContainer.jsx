import Categories from '../../Categories/Categories';
import PizzaBlock from './Pizza-block';
import Sort from '../../Sort/Sort';
import { useEffect, useState } from 'react';
import SkeletonLoader from '../../../assets/SkeletonReact/SkeletonReact';
import * as axios from 'axios'
import Paginate from '../../Paginate/Paginate';
import { useContext } from 'react';
import { SearchContext } from '../../../App';
import { useDispatch, useSelector } from 'react-redux';
import { changeQueryParam, setPageNumber } from '../../../state/pizzaBlock-reducer';
import qs from 'qs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRef } from 'react';

const PizzaBlockContainer = (props) => {
  const { pizzaCategory, pageNumber } = useSelector((state) => state.pizzaState);
  const { sortNumber, sortParam } = useSelector((state) => state.pizzaState.sort);
  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFetching = useRef(false);
  const isMounted = useRef(false);

  const filterFetch = () => {
    let search = searchValue !== '' ? `name=${searchValue}` : '';
    let pagination = `page=${pageNumber}&limit=4`;
    let category = pizzaCategory === 0 ? '' : `category=${pizzaCategory}`;
    let sortBy = `sortBy=${sortParam[sortNumber]}`;
    setIsLoad(false)
    axios.get(`https://62a5c5ab430ba53411cc40f9.mockapi.io/items?${category}&${search}&${sortBy}&${pagination}`)
      .then(response => {
        setPizzas(response.data);
        setIsLoad(true);
      })
  }

  useEffect(() => {
    if (window.location.search) {
      let param = qs.parse((window.location.search.substring(1)));
      dispatch(changeQueryParam(param))
      isFetching.current = true;     
    }
  }, [])

  useEffect(() => {
    if (!isFetching.current){
      filterFetch()
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
    isMounted.current = true
    
    //setSearchParams({pizzaCategory, pageNumber, sortNumber})
  }, [ pizzaCategory, pageNumber, sortNumber])

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={pizzaCategory} />
        <Sort sortNumber={sortNumber} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {!isLoad
          ? [...new Array(6)].map((_, i) => <SkeletonLoader key={i} className="pizza-block" />)
          : pizzas.map(obj => {
            return <PizzaBlock key={obj.id} {...obj} />
          })
        }
      </div>
      <Paginate handlePageClick={(e) => dispatch(setPageNumber(e.selected + 1))} />
    </div>
  )
};

export default PizzaBlockContainer;