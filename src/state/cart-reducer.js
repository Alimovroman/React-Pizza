import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  totalPrice: 0,
  counterAddPizzas: 0,
  items: []
};

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    showingTotalPrice: (state, action) => {
      const findItem = state.items.find(e => e.id === action.payload.id);
      if (findItem) {
        findItem.count ++
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice += action.payload.price;
      state.counterAddPizzas ++
      
      // state.totalPrice += action.payload.price;
      // state.items.push(action.payload)
    },
    // showingTotalPrice: (state, action) => {

    //   const findItem = state.items.find(id => id === action.payload.id);
    //   console.log(findItem);


    // },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item, index) => index !== action.payload.index);
      state.totalPrice -= (action.payload.price * action.payload.count);
      state.counterAddPizzas -= action.payload.count;
    },
    incrementCount: (state, action) => {
      const findItem = state.items.find(e => e.id === action.payload.id);
      state.counterAddPizzas += 1;
      state.totalPrice += action.payload.price
      findItem.count ++
    },
    decrementCount: (state, action) => {
      const findItem = state.items.find(e => e.id === action.payload.id);
      state.counterAddPizzas -= 1;
      state.totalPrice -= action.payload.price;
      findItem.count --
    }
  }
});

export const {showingTotalPrice, clearCart, deleteItem, incrementCount, decrementCount} = cartReducer.actions;
export default cartReducer.reducer;