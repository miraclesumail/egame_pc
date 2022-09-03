import { GetAsyncThunk } from "@/utils/tool";
import { WORK } from "@/store/actionType";
import { testRequest } from "@/api";
import { nanoid } from "@reduxjs/toolkit";

export const { adapter: testAdapter,getTestList, extraReducers: getTestListExtraReducers } = new GetAsyncThunk({
  adapter:true,
  ascyncFunc: async () => {
    try {
      const res = await testRequest();
      res.map((e) => {
        e.id = nanoid();
        return e;
      });
    } catch (error) {
      throw error;
    }
  },
  funcName: 'getTestList',
  storeName: WORK,
  pending: (state) => {
  },
  fulfilled: (state, action) => {
    testAdapter.setAll(state, action);
  },
  rejected: (state, _action) => {
  }
});
