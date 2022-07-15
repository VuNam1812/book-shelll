const { default: axios } = require("axios");

const apis = {
  getBookList: async () => {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=reactjs");
  },
  getBookDetail: async (id) => {
    return axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
  },
};

module.exports = apis;
