import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getFullPizza, itemPizzaSelector, statusPizzaSelector } from "../../../state/fullPizza-reducer";
import { AppDispatch } from "../../../state/store";
import React from "react";


const FullPizza: React.FC = () => {
  const item = useSelector(itemPizzaSelector);
  const status = useSelector(statusPizzaSelector)
  const dispatch =  useDispatch<AppDispatch>()
  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getFullPizza(id!))
    if(status === `error`) {
      alert(`Такой пиццы нету`)
      navigate('/')
    }
  }, [status, id])
  return (
    <div className="container">
      {status === `loading` && <div>...Loading</div>}
      {status === 'success' && <>
        <img src={item[0].imageUrl} alt="pizza" />
        <p>{item[0].name}</p>
        <p>{item[0].price} ₽</p>
      </>}
    </div>
  )
};

export default FullPizza;