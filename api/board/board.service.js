const dbService = require("../../services/db.service");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  query,
  getById,
  remove,
  add,
  update,
};

async function query(filterBy = {}) {
  try {
    const criteria = _filterBoards(filterBy);
    const collection = await dbService.getCollection("board");
    const boards = await collection.find(criteria).toArray();
    return boards;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getById(boardId) {
  try {
    const collection = await dbService.getCollection("board");
    const board = collection.findOne({ _id: ObjectId(boardId) });
    if (!board) return Promise.reject("No such board");
    return board;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function remove(boardId) {
  try {
    const collection = await dbService.getCollection("board");
    const criteria = { _id: ObjectId(boardId) };
    await collection.deleteOne(criteria);
    console.log(collection);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function add(board) {
  try {
    const collection = await dbService.getCollection("board");
    const boardId = await collection.insertOne(board);
    board._id = boardId.insertedId;
    return board;
  } catch (err) {
    logger.error("cannot insert board", err);
    throw err;
  }
}

async function update(board) {
  try {
    var id = ObjectId(board._id);
    delete board._id;
    const collection = await dbService.getCollection("board");
    await collection.updateOne({ _id: id }, { $set: { ...board } });
    board._id = id
    return board;
  } catch (err) {
    logger.error("cannot update board", err);
    throw err;
  }
}

function _filterBoards(filterBy) {
  let filteredBoards = {};
  if (filterBy.userId) {
    filteredBoards.createdBy._id = filterBy.userId;
  }

  // filter by name
  //   const regex = new RegExp(filterBy.name, "i");
  //   filteredToys = gToys.filter((toy) => regex.test(toy.name));

  // filter by isStarred
  //   if (filterBy.inStock) {
  //     filteredToys = filteredToys.filter(
  //       (toy) => JSON.parse(toy.inStock) === JSON.parse(filterBy.inStock)
  //     );
  //   }

  // Sorting -recent viewed?
  //   if (filterBy.sortBy) {
  //     if (filterBy.sortBy === "name") {
  //       filteredToys = filteredToys.sort((t1, t2) =>
  //         t1.name.toLowerCase() > t2.name.toLowerCase() ? 1 : -1
  //       );
  //     } else {
  //       filteredToys = filteredToys.sort(
  //         (t1, t2) => t1[filterBy.sortBy] - t2[filterBy.sortBy]
  //       );
  //     }
  //   }

  return filteredBoards;
}
