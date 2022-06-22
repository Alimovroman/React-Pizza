import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pizzaCategory: 0,
  sort: {
    sortNumber: 0,
    sortParam: ['rating', 'rating&order=desc', 'price', 'price&order=desc', 'name', 'name&order=desc']
  },
  pageNumber: 1
}

export const pizzaState = createSlice({
  name: 'pizzaState',
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.pizzaCategory = action.payload
    },
    changeParamSort: (state, action) => {
      state.sort.sortNumber = action.payload
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload
    },
    changeQueryParam: (state, action) => {
      state.pageNumber = Number(action.payload.pageNumber);
      state.pizzaCategory = Number(action.payload.pizzaCategory);
      state.sort.sortNumber = Number(action.payload.sortNumber);
    }
  }
});

export const {changeCategory, changeParamSort, setPageNumber, changeQueryParam} = pizzaState.actions;
export default pizzaState.reducer

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