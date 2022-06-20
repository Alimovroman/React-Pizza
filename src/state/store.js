import { configureStore } from "@reduxjs/toolkit";
import pizzaBlockState from "./pizzaBlock-reducer";

const store = configureStore ({
  reducer: {
    pizzaState: pizzaBlockState,
  }
  
});

export default store;