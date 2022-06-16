import style from './NotFound.module.scss'

const NotFound = (props) => {
  return (
    <div className={style.root}>
      <h2>Страница не найдена</h2>
      <p>К сожалению такой страницы нет в нашем интернет магазине</p>
    </div>
  )
};

export default NotFound;