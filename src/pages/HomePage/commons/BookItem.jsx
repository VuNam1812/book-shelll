import React from "react";
import { useNavigate } from "react-router-dom";
const BookItem = ({ book }) => {
  const navigate = useNavigate();
  const handleErrorImage = (e) => {
    const image = "/img-na.png";
    e.target.src = image;

    e.target.onerror = null;
  };

  const handleRedirectBook = () => {
    navigate(`/books/${book.id}`);
  };

  return (
    <div className="book-group__book-item">
      <div className="book-item__minisize">
        <div className="book-item__image" onClick={handleRedirectBook}>
          <img
            src={book?.volumeInfo?.imageLinks?.thumbnail || ""}
            alt="book-img"
            onError={handleErrorImage}
          />
        </div>
        <div className="book-item__info" onClick={handleRedirectBook}>
          <p className="info__book-title">{book?.volumeInfo?.title || ""}</p>
        </div>

        <div className="book-item__fullsize">
          <div className="fullsize__image" onClick={handleRedirectBook}>
            <img
              src={book?.volumeInfo?.imageLinks?.thumbnail || ""}
              alt="book-img"
              onError={handleErrorImage}
            />
          </div>
          <div className="fullsize__info">
            <p className="info__title" onClick={handleRedirectBook}>
              {book?.volumeInfo?.title || ""}
            </p>
            <p className="info__time">
              {book?.volumeInfo?.publishedDate || "-"} |{" "}
              {book?.volumeInfo?.pageCount || "-"} pages
            </p>
            <p className="info__tags">
              {book?.volumeInfo?.categories?.map((tag, index) => {
                return <span key={index}>{tag}</span>;
              })}
            </p>
            <p className="info__author">
              <span>Authors: </span>
              {book?.volumeInfo?.authors?.join(", ") || "-"}{" "}
            </p>
            <div
              className="info__desc"
              dangerouslySetInnerHTML={{
                __html: book?.volumeInfo?.description,
              }}
            ></div>
            <button className="info__btn" onClick={handleRedirectBook}>
              Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
