import { createSlice, createSelector } from '@reduxjs/toolkit';
import {  getTestListExtraReducers, testAdapter } from '../actions/work.thunk';
import { WORK } from '../actionType';
// const testAdapter = createEntityAdapter();

const { actions, reducer: workReducer } = createSlice({
  name: WORK,
  initialState: testAdapter.getInitialState({
    loading: true
  }),
  reducers: {
    removeTestData: testAdapter.removeOne,
    removeWorkDataAll: {
      reducer: (state) => {
        testAdapter.removeAll(state);
      },
      prepare: (id) => {
        return id;
      }
    },
    addGameWorkData: {
      reducer: testAdapter.addOne,
      prepare: (payload) => {
        return {
          payload
        }
      }
    },
    setAllGameWorkData: {
      reducer: testAdapter.setAll,
      prepare: (payload) => {
        return {
          payload
        }
      }
    },
    setTableInfoData: {
      reducer: testAdapter.setOne,
      prepare (payload) {
        return {
          payload: payload
        };
      }
    }
  },
  extraReducers: {
    ...getTestListExtraReducers,
  }
});
const { selectAll } = testAdapter.getSelectors();
export const selectorWork = createSelector((state: { [x: string]: any; }) => state[WORK], selectAll);
export const selectorWorkLoading = createSelector((state: { [x: string]: any; }) => state[WORK], (value) => value.loading);
export const {
  removeTestData,
  setAllGameWorkData,
  addGameWorkData,
  setTableInfoData,
  removeWorkDataAll
} = actions;
export default workReducer;
