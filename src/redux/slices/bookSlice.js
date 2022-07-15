import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookApi from "../../apis/bookApi.js";

const fetchBookList = createAsyncThunk("books/fetchList", async (_) => {
  try {
    const res = await bookApi.getBookList();
    return res?.data?.items;
  } catch (error) {
    console.log(error);
    return error;
  }
});

const fetchBookDetail = createAsyncThunk(
  "books/fetchDetail",
  async (bookId) => {
    try {
      const res = await bookApi.getBookDetail(bookId);
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
    builder.addCase(fetchBookDetail.fulfilled);
  },
});

export default slice.reducer;
// export const {} = slice.actions;
export { fetchBookList, fetchBookDetail };
