import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

export type PizzaType = {
  category: number,
  id: number,
  imageUrl: string,
  name: string,
  price: number,
  rating: number,
  sizes: number[],
  types: number[]
}

interface PizzaState {
  pizzasItems: PizzaType[],
  status: string
}

const initialState = {
  pizzasItems: [],
  status: 'loading'
} as PizzaState;

const pizzasReducer = createSlice({
  name: 'pizzasItem',
  initialState,
  reducers: {
    setPizzasItems: (state, action: PayloadAction<PizzaType[]>) => {
      state.pizzasItems = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPizzas.pending, state => {
      state.status = 'loading';
    })
    builder.addCase(getPizzas.fulfilled, (state, action: PayloadAction<PizzaType[]>) => {
      state.pizzasItems = action.payload;
      state.status = 'success'
    })
    builder.addCase(getPizzas.rejected, (state) => {
      state.status = 'error';
      state.pizzasItems = [];
    })
  }
});

type GetPizzasProps = {
  search: string, pagination: string, category: string, sortBy: string
}
export const getPizzas = createAsyncThunk(
  'pizzasItem/getPizzas',
  async ({ search, pagination, category, sortBy }: GetPizzasProps) => {
    //debugger
    let response = await axios.get(`https://62a5c5ab430ba53411cc40f9.mockapi.io/items?${category}&${search}&${sortBy}&${pagination}`)
    //dispatch(setPizzasItems(response.data))
    return response.data as PizzaType[]
  }
);

export const pizzaItemSelector = (state: RootState) => state.pizzasItem;



export const { setPizzasItems } = pizzasReducer.actions;
export default pizzasReducer.reducer;