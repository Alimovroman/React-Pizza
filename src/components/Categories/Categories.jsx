import { useState } from "react";

const Categories = (props) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const onActiveCategories = (num) => {
    setActiveCategory(num)
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