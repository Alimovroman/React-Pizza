import { configureStore } from "@reduxjs/toolkit";
import pizzaBlockState from "./pizzaBlock-reducer";
import cartReducer from "./cart-reducer";

const store = configureStore ({
  reducer: {
    pizzaState: pizzaBlockState,
    cart: cartReducer
  }
  
});

export default store;