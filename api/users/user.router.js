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

router.post("/create-user", createUser);
router.get("/get-users", getUsers);
router.get("/get-user-by-id/:id", getUserById); // => when data is defined inside root as params [url-params]
router.delete("/delete-user", deleteUser);
router.patch("/update-user", updateUser);
router.post("/login", login);

module.exports = router;
