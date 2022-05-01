const logger = require("../../services/logger.service");
const giphyService = require("./giphy.service");

async function getTrending(req, res) {
  try {
    const result = await giphyService.getTrending();
    res.send(result);
  } catch (err) {
    logger.error("Cannot get trending giphys", err);
    res.status(500).send({ err: "Failed to get trending giphys" });
  }
}

async function search(req, res) {
  try {
    const result = await giphyService.search(req.query.q);
    res.send(result);
  } catch (err) {
    logger.error("Cannot search giphys", err);
    res.status(500).send({ err: "Failed to search giphys" });
  }
}

module.exports = {
  getTrending,
  search,
};
