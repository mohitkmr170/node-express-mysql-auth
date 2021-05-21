/**
 * Import all controller to handle routings
 */
const {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  login,
} = require("./user.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");

router.post("/create-user", checkToken, createUser);
router.get("/get-users", checkToken, getUsers);
router.get("/get-user-by-id/:id", checkToken, getUserById); // => when data is defined inside root as params [url-params]
router.delete("/delete-user", checkToken, deleteUser);
router.patch("/update-user", checkToken, updateUser);
router.post("/login", login);

module.exports = router;
