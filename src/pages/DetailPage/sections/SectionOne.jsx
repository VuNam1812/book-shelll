import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBookDetail } from "../../../redux/slices/bookSlice";
import { useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import numeral from "numeral";
const SectionOne = () => {
  const params = useParams();
  const [bookInfo, setBookInfo] = useState({});
  const dispatch = useDispatch();

  const handleErrorImage = (e) => {
    const image = "/img-na.png";
    e.target.src = image;

    e.target.onerror = null;
  };

  useEffect(() => {
    (async () => {
      const resultActions = await dispatch(fetchBookDetail(params.bookId));
      const bookDetail = unwrapResult(resultActions);

      setBookInfo(bookDetail);
    })();
  }, [params, dispatch]);
  return (
    <section className="section-one">
      <div className="container">
        <div className="detail-book__content-book">
          <div className="content-book__name">
            {bookInfo?.volumeInfo?.title || "Chưa cập nhập"}
          </div>
          <p className="content-book__times">
            <span>{bookInfo?.volumeInfo?.publisher}</span> |{" "}
            <span>{bookInfo?.volumeInfo?.publishedDate}</span> |{" "}
            <span>{bookInfo?.volumeInfo?.pageCount} pages</span>
          </p>
          <div className="content-book__tags">
            {bookInfo?.volumeInfo?.categories?.map((val) => {
              return <span>{val}</span>;
            })}
          </div>
          <div className="content-book__language">
            Language: <span>{bookInfo?.volumeInfo?.language}</span>
          </div>
          <div className="content-book__price">
            Sale Location: <span>{bookInfo?.saleInfo?.country}</span> | Price:{" "}
            <span>
              {numeral(bookInfo?.saleInfo?.retailPrice?.amount).format("0,0") ||
                0}{" "}
              VND
            </span>
          </div>

          <div className="content-book__author">
            Author: <span>{bookInfo?.volumeInfo?.authors.join(", ")}</span>
          </div>
          <div
            className="content-book__desc"
            dangerouslySetInnerHTML={{
              __html: bookInfo?.volumeInfo?.description,
            }}
          ></div>
          <div className="content-book__btns">
            <a
              href={bookInfo?.saleInfo?.buyLink}
              target="_blank"
              rel="noreferrer"
            >
              <button>Buy now</button>
            </a>
          </div>
        </div>
        <div className="detail-book__cover-image">
          <img
            src={bookInfo?.volumeInfo?.imageLinks?.thumbnail}
            onError={handleErrorImage}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
