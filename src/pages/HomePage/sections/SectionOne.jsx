import React from "react";
import { useSelector } from "react-redux";

const SectionOne = () => {
  const bookList = useSelector((state) => state?.bookReducer?.list);

  const handleErrorImage = (e) => {
    const image = "/img-na.png";
    e.target.src = image;

    e.target.onerror = null;
  };

  return (
    <section className="section-one">
      <div className="container">
        <label className="section__label">
          <i className="fa-solid fa-star"></i>
          Hot new
        </label>
        <div className="book-group">
          {bookList?.map((book, index) => {
            return (
              <div key={index} className="book-group__book-item">
                <div className="book-item__minisize">
                  <div className="book-item__image">
                    <img
                      src={book?.volumeInfo?.imageLinks?.thumbnail || ""}
                      alt="book-img"
                      onError={handleErrorImage}
                    />
                  </div>
                  <div className="book-item__info">
                    <p className="info__book-title">
                      {book?.volumeInfo?.title || ""}
                    </p>
                  </div>

                  <div className="book-item__fullsize">
                    <div className="fullsize__image">
                      <img
                        src={book?.volumeInfo?.imageLinks?.thumbnail || ""}
                        alt="book-img"
                        onError={handleErrorImage}
                      />
                    </div>
                    <div className="fullsize__info">
                      <p className="info__title">
                        {book?.volumeInfo?.title || ""}
                      </p>
                      <p className="info__time">
                        {book?.volumeInfo?.publishedDate || "-"} |{" "}
                        {book?.volumeInfo?.pageCount || "-"} pages
                      </p>
                      <p className="info__tags">
                        {book?.volumeInfo?.categories?.map((tag) => {
                          return <span>{tag}</span>;
                        })}
                      </p>
                      <p className="info__desc">
                        {book?.volumeInfo?.description || "-"}
                      </p>
                      <button className="info__btn">Detail</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

{
  /* <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        navigation={true}
        loop={true}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
      >
        {new Array(4).fill(null).map((_, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="book-intro-item ">
                <div className="container">
                  <div>
                    <p>Book title</p>
                    <p>description title</p>
                    <div>author</div>
                  </div>
                  <div></div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper> */
}
export default SectionOne;
