/**
 * Handles all API request/response (w.r.t all Services)
 */
const {
  create,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  /**
   * Controller to handle createUser service
   * @param {*} req
   * @param {*} res
   */
  createUser: (req, res) => {
    const body = req.body;
    const loginBody = { email: body.email, password: body.password };
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  /**
   * Controller to handle getUserById service
   * @param {*} req
   * @param {*} res
   */
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  /**
   * Controller to handle getUsers service
   * @param {*} res
   * @param {*} res
   */
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Failed, Record not found",
        });
      }
      /*
      NOTES : Check if we can any other controller (ex - getUserById => to get the updated user)
      */
      return res.json({
        success: 1,
        message: "User updated successfully",
      });
    });
  },

  deleteUser: (req, res) => {
    const body = req.body;
    deleteUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found",
        });
      }
      return res.json({
        success: 1,
        message: "User deleted successfully",
      });
    });
  },

  /**
   * Controller to handle Login service
   * @param {*} req
   * @param {*} res
   */
  login: (req, res) => {
    body = req.body;
    getUserByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        result.password = undefined;
        /**
         * Never pass password inside sign methods while creating JSON web token
         */
        const jsonToken = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "Login successful",
          token: jsonToken,
        });
      } else
        res.json({
          success: 0,
          data: "Invalid email or password",
        });
    });
  },
};
