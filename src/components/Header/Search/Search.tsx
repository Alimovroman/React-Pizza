import style from './Search.module.scss';
import searchIcon from '../../../assets/img/search-icon.svg';
import deleteIcon from '../../../assets/img/delete-icon.svg';
import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../../state/main-reducer';

const Search:React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('')
  let ref = React.useRef<HTMLInputElement>(null);

  const searchPizzaCallback = useCallback(
    debounce((e: string) => {
      dispatch(setSearchValue(e))
    },400),[]);
  const searchPizza = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    searchPizzaCallback(e.target.value)
  }, [])
  const clearSearchValue = () => {
    setValue('');
    dispatch(setSearchValue(''))
    ref.current?.focus();
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