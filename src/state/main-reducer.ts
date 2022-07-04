import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface MainState {
  searchValue: string,
  pizzaCategory: number,
  sort: {
    sortNumber: number,
    sortParam: string[],
  },
  pageNumber: number
}

const initialState: MainState = {
  searchValue: '',
  pizzaCategory: 0,
  sort: {
    sortNumber: 0,
    sortParam: ['rating', 'rating&order=desc', 'price', 'price&order=desc', 'name', 'name&order=desc']
  },
  pageNumber: 1
} 

export const mainReducer = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    changeCategory: (state, action: PayloadAction<number>) => {
      state.pizzaCategory = action.payload
    },
    changeParamSort: (state, action: PayloadAction<number>) => {
      state.sort.sortNumber = action.payload
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload
    },
    changeQueryParam: (state, action: PayloadAction<{pageNumber?: string, pizzaCategory?:string, sortNumber?: string}>) => {
      state.pageNumber = Number(action.payload.pageNumber!);
      state.pizzaCategory = Number(action.payload.pizzaCategory!);
      state.sort.sortNumber = Number(action.payload.sortNumber!);
    }
  }
});

export const sortSelector = (state: RootState) => state.main.sort;
export const mainSelector = (state: RootState) => state.main;
export const searchValueSelector = (state: RootState) => state.main.searchValue;

export const {changeCategory, changeParamSort, setPageNumber, changeQueryParam, setSearchValue} = mainReducer.actions;
export default mainReducer.reducer

// const pizzaBlockReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CHANGE_CATEGORY:
//       return {
//         ...state,
//         category: action.category
//       }
//     default:
//       return state;
//   }
// };

//export const changeCategory = (category) => ({type: CHANGE_CATEGORY, category});



//export default pizzaBlockReducer;