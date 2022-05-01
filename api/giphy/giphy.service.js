const axios = require("axios");

const GIPHY_API = "qiXS5ENgtSYGNw2bw6OlQJ4NUh26Vq1q";
const GIPHY_TRENDING_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API}`;
const GIPHY_SEARCH_URL = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API}`;

module.exports = {
  getTrending,
  search,
};

async function getTrending() {
  try {
    const res = await axios.get(GIPHY_TRENDING_URL);
    return res.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function search(q) {
  try {
    const res = await axios.get(GIPHY_SEARCH_URL + `&q=${q}`);
    return res.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
