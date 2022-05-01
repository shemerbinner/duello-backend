const logger = require("../../services/logger.service");
const userService = require("../user/user.service");
const socketService = require("../../services/socket.service");
const boardService = require("./board.service");

async function getBoards(req, res) {
  try {
    // const filterBy = {id: userId}
    const boards = await boardService.query(req.query);
    res.send(boards);
  } catch (err) {
    logger.error("Cannot get boards", err);
    res.status(500).send({ err: "Failed to get boards" });
  }
}

async function getBoardById(req, res) {
  try {
    const boardId = req.params.id;
    const board = await boardService.getById(boardId);
    res.json(board);
  } catch (err) {
    logger.error("Failed to get board", err);
    res.status(500).send({ err: "Failed to get board" });
  }
}

async function deleteBoard(req, res) {
  try {
    const id = req.params.id.trim();
    await boardService.remove(id);
    res.send({ msg: "Deleted successfully" });
  } catch (err) {
    logger.error("Failed to delete board", err);
    res.status(500).send({ err: "Failed to delete board" });
  }
}

async function addBoard(req, res) {
  try {
    var board = req.body;
    // board.createdBy = req.session.user;
    const newBoard = await boardService.add(board);

    // console.log("CTRL SessionId:", req.sessionID);
    // socketService.broadcast({
    //   type: "board-added",
    //   data: board,
    //   userId: board.byUserId,
    // });
    // socketService.emitToUser({
    //   type: "board-about-you",
    //   data: board,
    //   userId: board.aboutUserId,
    // });
    // socketService.emitTo({
    //   type: "user-updated",
    //   data: fullUser,
    //   label: fullUser._id,
    // });

    res.send(newBoard);
  } catch (err) {
    console.log(err);
    logger.error("Failed to add board", err);
    res.status(500).send({ err: "Failed to add board" });
  }
}

async function updateBoard(req, res) {
  try {
    const board = req.body;
    const updatedBoard = await boardService.update(board);
    // console.log(updatedBoard);
    res.json(updatedBoard);
  } catch (err) {
    logger.error("Failed to update board", err);
    res.status(500).send({ err: "Failed to update board" });
  }
}

module.exports = {
  getBoards,
  getBoardById,
  deleteBoard,
  addBoard,
  updateBoard,
};
