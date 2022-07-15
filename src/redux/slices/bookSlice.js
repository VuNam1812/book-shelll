import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookApi from "../../apis/bookApi.js";

const fetchBookList = createAsyncThunk(
  "books/fetchList",
  async (_, thunkApi) => {
    try {
      const res = await bookApi.getBookList();
      return res?.data?.items;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

const fetchBookDetail = createAsyncThunk(
  "books/fetchList",
  async (bookId, thunkApi) => {
    try {
      const res = await bookApi.fetchBookDetail(bookId);
      return res?.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

const initialState = {
  list: [],
};

const slice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookList.fulfilled, (state, action) => {
      state.list = state?.list.concat(action?.payload || []);
    });
  },
});

export default slice.reducer;
export const {} = slice.actions;
export { fetchBookList, fetchBookDetail };
