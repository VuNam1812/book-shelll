import React from "react";
import BookItem from "../commons/BookItem";
import { useNavigate } from "react-router-dom";

const SectionOne = ({ books }) => {
  const navigate = useNavigate();
  return (
    <section className="section-one">
      <div className="container">
        <div className="header-section">
          <label className="section__label">
            <i className="fa-solid fa-star"></i>
            Hot new
          </label>
          <button
            onClick={() => {
              navigate("/books/create");
            }}
          >
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
