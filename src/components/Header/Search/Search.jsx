import style from './Search.module.scss';
import searchIcon from '../../../assets/img/search-icon.svg';
import deleteIcon from '../../../assets/img/delete-icon.svg';
import { useContext } from 'react';
import { SearchContext } from '../../../App';

const Search = (props) => {
  const {searchValue, setSearchValue} = useContext(SearchContext)
  return (
    <div className={style.root}>
      <img src={searchIcon} alt='search' />
      <input onChange={(e) => setSearchValue(e.target.value)} className={style.input} type='text' placeholder="Search" value={searchValue}/>
      {searchValue !== '' &&  <img className={style.delete} onClick={() => setSearchValue('')} src={deleteIcon} alt='delete' />  }
    </div>
  )
};

export default Search;