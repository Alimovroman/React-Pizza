import { useDispatch } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./main-reducer";
import cartReducer from "./cart-reducer";
import pizzasReducer from "./pizzas-reducer";
import fullPizzaReducer from "./fullPizza-reducer";
//import thunkMiddleware from 'redux-thunk';

const store = configureStore ({
  reducer: {
    main: mainReducer,
    cart: cartReducer,
    pizzasItem: pizzasReducer,
    fullPizza: fullPizzaReducer
  },

});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;