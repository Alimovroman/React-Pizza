import ReactPaginate from 'react-paginate';
import style from './Paginate.module.scss';

const Paginate = ({ handlePageClick }) => {
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  )
};

export default Paginate;