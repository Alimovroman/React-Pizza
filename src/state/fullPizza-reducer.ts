import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaType } from "./pizzas-reducer";
import { RootState } from "./store";

interface FullPizzaState {
  item: PizzaType[]
  status: string
}
const initialState = {
  item: [],
  status: 'loading'
} as FullPizzaState;

const fullPizzaReducer = createSlice({
  name: 'fullPizza',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(getFullPizza.fulfilled, (state, action: PayloadAction<PizzaType[]>) => {
      if (action.payload.length <= 0) {
        state.status = 'error'
      } else {
        state.item = action.payload;
        state.status = 'success'
      }
    })
    builder.addCase(getFullPizza.rejected, (state) => {
      state.status = 'error'
    })
  }
});




export const getFullPizza = createAsyncThunk(
  `fullPizza/getFullPizza`,
  async (id: string) => {
    let response = await axios.get(`https://62a5c5ab430ba53411cc40f9.mockapi.io/items?id=${id}`)
    console.log( response.data)
    return (response.data) as PizzaType[]
  }
);

export const itemPizzaSelector = (state: RootState)  => state.fullPizza.item;
export const statusPizzaSelector = (state: RootState) => state.fullPizza.status;
export default fullPizzaReducer.reducer