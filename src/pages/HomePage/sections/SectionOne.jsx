import React from "react";
import { useSelector } from "react-redux";
import BookItem from "../commons/BookItem";

const SectionOne = () => {
  const bookList = useSelector((state) => state?.bookReducer?.list);

  return (
    <section className="section-one">
      <div className="container">
        <label className="section__label">
          <i className="fa-solid fa-star"></i>
          Hot new
        </label>
        <div className="book-group">
          {bookList?.map((book, index) => {
            return <BookItem book={book} key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
