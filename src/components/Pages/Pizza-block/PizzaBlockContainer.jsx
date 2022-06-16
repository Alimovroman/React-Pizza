import Categories from '../../Categories/Categories';
import PizzaBlock from './Pizza-block';
import Sort from '../../Sort/Sort';
import { useEffect, useState } from 'react';
import SkeletonLoader from '../../../assets/SkeletonReact/SkeletonReact';
import * as axios from 'axios'
import Paginate from '../../Paginate/Paginate';
import { useContext } from 'react';
import { SearchContext } from '../../../App';

const PizzaBlockContainer = (props) => {
  const {searchValue} = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [sortNumber, setSortNumber] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    let param = ['rating', 'price', 'name'];
    let search = searchValue !== '' ? `name=${searchValue}` : '';     
    let pagination = `page=${pageNumber}&limit=4`;
    let category = activeCategory === 0 ? '' : `category=${activeCategory}`;
    setIsLoad(false)
    axios.get(`https://62a5c5ab430ba53411cc40f9.mockapi.io/items?${category}&${search}&sortBy=${param[sortNumber]}&${pagination}`)
      .then(response => {
        setPizzas(response.data);
        setIsLoad(true);
      })
    window.scrollTo(0, 0);
  }, [sortNumber, activeCategory, searchValue, pageNumber]);
 
  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={activeCategory} onCategoryClick={(i) => setActiveCategory(i)} />
        <Sort onSortClick={(i) => setSortNumber(i)} sortNumber={sortNumber} />
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
    <Paginate handlePageClick={(e)=> setPageNumber(e.selected + 1)}/>
    </div>
  )
};
export default PizzaBlockContainer;