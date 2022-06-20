import { useDispatch } from "react-redux";
import { changeCategory } from "../../state/pizzaBlock-reducer";

const Categories = ({ activeCategory }) => {
  const dispatch = useDispatch();
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const onActiveCategories = (num) => {
    //alert(num)
    //onCategoryClick(num)
    dispatch(changeCategory(num))
  }
  return (
    <div className="categories">
      <ul>
        {categories.map((e, i) => {
          return (
            <li key={i} onClick={() => onActiveCategories(i)} className={activeCategory === i ? "active" : ''} >{e}</li>
          )
        })}
      </ul>
    </div>
  )
};

export default Categories;