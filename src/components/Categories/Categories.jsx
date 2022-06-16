

const Categories = ({onCategoryClick, activeCategory}) => {
 
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const onActiveCategories = (num) => {
    onCategoryClick(num)
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