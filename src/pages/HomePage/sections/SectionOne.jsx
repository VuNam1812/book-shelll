import React from "react";
import BookItem from "../commons/BookItem";

const SectionOne = ({ books }) => {
  return (
    <section className="section-one">
      <div className="container">
        <div className="header-section">
          <label className="section__label">
            <i className="fa-solid fa-star"></i>
            Hot new
          </label>
          <button>
            <i className="fa-solid fa-plus"></i>Add Book
          </button>
        </div>
        <div className="book-group">
          {books?.map((book, index) => {
            return <BookItem book={book} key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
