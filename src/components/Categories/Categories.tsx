import { useDispatch } from "react-redux";
import { changeCategory } from "../../state/main-reducer";
import React from "react";
import { AppDispatch } from "../../state/store";

type CategoriesProps = { // так типизируем Функциоанльные компоненты React.FC, если без FC то можно ({a} :{a:sting})
  activeCategory: number
}

const Categories: React.FC <CategoriesProps> = React.memo(({ activeCategory }) => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const onActiveCategories = React.useCallback((num: number) => {
    //alert(num)
    //onCategoryClick(num)
    dispatch(changeCategory(num))
  }, [])
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
});

export default Categories;