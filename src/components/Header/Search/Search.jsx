import style from './Search.module.scss';
import searchIcon from '../../../assets/img/search-icon.svg';
import deleteIcon from '../../../assets/img/delete-icon.svg';
import React, { useContext } from 'react';
import { SearchContext } from '../../../App';
import { useState } from 'react';
import { useCallback } from 'react';
import debounce from 'lodash.debounce';

const Search = (props) => {
  const {searchValue, setSearchValue} = useContext(SearchContext);
  const [value, setValue] = useState('')
  let ref = React.createRef();

  const searchPizzaCallback = useCallback(
    debounce((e) => {
      setSearchValue(e)
    },400),[]);
  const searchPizza = useCallback((e) => {
    setValue(e.target.value)
    searchPizzaCallback(e.target.value)
  }, [])
  const clearSearchValue = () => {
    setValue('');
    setSearchValue('')
    ref.current.focus();
  }
  return (
    <div className={style.root}>
      <img src={searchIcon} alt='search' className={style.searchImg}/>
      <input onChange={(e) => searchPizza(e)} ref={ref} className={style.input} type='text' placeholder="Search" value={value}/>
      {value !== '' &&  <img className={style.delete} onClick={() => clearSearchValue()} src={deleteIcon} alt='delete' />  }
    </div>
  )
};

export default Search;