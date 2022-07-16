import React, { useEffect, useState } from "react";
import SectionOne from "./sections/SectionOne";
import { fetchBookList } from "../../redux/slices/bookSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SectionTwo from "./sections/SectionTwo";
import { unwrapResult } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";

const HomePageContainer = () => {
  const bookList = useSelector((state) => state?.bookReducer?.list);
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);
  const params = useParams();

  const searchBooksWithFilter = (params) => {
    let currBook = [...bookList];
    if (params.etag) {
      currBook = currBook.filter(
        (val) => JSON.stringify(val).indexOf(params.etag) !== -1
      );
    }
    if (params.author) {
      currBook = currBook.filter(
        (val) => JSON.stringify(val).indexOf(params.author) !== -1
      );
    }
    if (params.search) {
      currBook = currBook.filter((val) => {
        const { description = "", title = "" } = val?.volumeInfo;
        const destinationSearch = (description + " " + title).toLowerCase();
        const searchParam = params.search.toLowerCase();
        const idx = destinationSearch.indexOf(searchParam);
        console.log(destinationSearch, searchParam, idx);
        return idx !== -1;
      });
    }

    return currBook;
  };

  useEffect(() => {
    (async () => {
      const fetchDispatch = await dispatch(fetchBookList());
      const resBook = unwrapResult(fetchDispatch);
      setBooks([...resBook]);
    })();
  }, []);

  return (
    <main className="home-page">
      <SectionTwo
        onSubmitSearch={(dataSubmit) => {
          const newBooks = searchBooksWithFilter(dataSubmit);
          setBooks([...newBooks]);
        }}
      />
      <SectionOne books={books} />
    </main>
  );
};

export default HomePageContainer;
