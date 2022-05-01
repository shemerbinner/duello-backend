const express = require("express");
const {
  requireAuth,
  requireAdmin,
} = require("../../middlewares/requireAuth.middleware");
const { log } = require("../../middlewares/logger.middleware");
const {
  addBoard,
  getBoards,
  deleteBoard,
  getBoardById,
  updateBoard,
} = require("./board.controller");
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get("/", log, getBoards);
router.get("/:id", log, getBoardById);
router.post("/", log, addBoard);
router.put("/:id", log, updateBoard);
// router.post("/", log, requireAuth, addBoard);
router.delete("/:id", deleteBoard);
// router.delete("/:id", requireAuth, deleteBoard);

module.exports = router;
