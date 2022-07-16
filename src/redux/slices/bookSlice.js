import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookApi from "../../apis/bookApi.js";
import _ from "lodash";
const fetchBookList = createAsyncThunk("books/fetchList", async (_) => {
  try {
    const res = await bookApi.getBookList();
    return res?.data?.items;
  } catch (error) {
    console.log(error);
    return [];
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
      return [];
    }
  }
);

const initialState = {
  list: [],
  etags: [],
  authors: [],
};

const slice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookList.fulfilled, (state, action) => {
      state.list = action?.payload || [];
      state.etags = [
        ...new Set(state?.list.reduce((pre, val) => [...pre, val.etag], [])),
      ];
      state.authors = [
        ...new Set(
          state?.list.reduce(
            (pre, val) => [...pre, ...(val?.volumeInfo?.authors || [])],
            []
          )
        ),
      ];
    });
    builder.addCase(fetchBookDetail.fulfilled);
  },
});

export default slice.reducer;
// export const {} = slice.actions;
export { fetchBookList, fetchBookDetail };
