import ReactPaginate from 'react-paginate';
import style from './Paginate.module.scss';
import React from 'react';
import { EventTypePaginate } from '../Pages/Pizza-block/PizzaBlockContainer';

type PaginateProps = {
  handlePageClick: (e: EventTypePaginate) => void
}

const Paginate:React.FC <PaginateProps> = ({ handlePageClick }) => {
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      //renderOnZeroPageCount={null}
    />
  )
};

export default Paginate;