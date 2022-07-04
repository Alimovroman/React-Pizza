import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface CartState {
  totalPrice: number,
  counterAddPizzas: number,
  items: ItemsProps[];
}

const initialState = {
  totalPrice: 0,
  counterAddPizzas: 0,
  items: []
} as CartState

type ItemsProps = {
  id: number,
  name: string,
  price: number,
  imageUrl: string,
  size: number,
  type: string,
  count: number
};

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    showingTotalPrice: (state, action: PayloadAction<{
      id: number, name: string, price: number, imageUrl: string, size: number, type: string,
    }>) => {
      const findItem = state.items.find((e) => e.id === action.payload.id);
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice += action.payload.price;
      state.counterAddPizzas++
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.counterAddPizzas = 0;
    },
    deleteItem: (state, action: PayloadAction<{price: number, index: number, count: number }>) => {
      state.items = state.items.filter((_item, index) => index !== action.payload.index);

      state.totalPrice -= (action.payload.price * action.payload.count);
      state.counterAddPizzas -= action.payload.count;
    },
    incrementCount: (state, action: PayloadAction<{ price: number, id: number }>) => {
      const findItem = state.items.find(e => e.id === action.payload.id);
      state.counterAddPizzas += 1;
      state.totalPrice += action.payload.price
      findItem && findItem.count++
    },
    decrementCount: (state, action: PayloadAction<{ price: number, id: number }>) => {
      const findItem = state.items.find(e => e.id === action.payload.id);
      state.counterAddPizzas -= 1;
      state.totalPrice -= action.payload.price;
      findItem && findItem.count--
    }
  }
});

export const cartSelector = (state: RootState) => state.cart;
export const totalPriceSelector = (state: RootState) => state.cart.totalPrice;
export const itemsSelector = (state: RootState) => state.cart.items;
export const counterAddPizzasSelector = (state: RootState) => state.cart.counterAddPizzas

export const { showingTotalPrice, clearCart, deleteItem, incrementCount, decrementCount } = cartReducer.actions;
export default cartReducer.reducer;