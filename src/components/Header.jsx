import React from "react";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="wrapper" style={{ justifyContent: "space-between" }}>
          <div className="header-logo">
            <i className="fa-solid fa-book"></i>
            <p>
              Book<span>Shell</span>
            </p>
          </div>
          <div className="header-search">
            <div className="header-search__etag-search">Etag</div>
            <div className="header-search__author-search">Author</div>
            <div className="header-search__text-search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input placeholder="Type to search"></input>
              <button>Search</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
