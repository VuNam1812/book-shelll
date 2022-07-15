import React, { useEffect } from "react";
import SectionOne from "./sections/SectionOne";
import { fetchBookList } from "../../redux/slices/bookSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const HomePageContainer = () => {
  const bookList = useSelector((state) => state?.bookReducer?.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!bookList.length) {
      dispatch(fetchBookList());
    }
  }, []);

  return (
    <main className="home-page">
      <SectionOne />
      <section className="section-two"></section>
    </main>
  );
};

export default HomePageContainer;
