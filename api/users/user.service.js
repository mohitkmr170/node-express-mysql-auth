/**
 * Handles all service (DB interactions)
 */
const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `Insert into users(firstName, lastName, gender, email, password, number)
      values(?, ?, ?, ?, ?, ?)`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  /**
   * Service to get all user
   * @param {*} callback
   */

  getUsers: (callback) => {
    pool.query(
      `select id,firstName,lastName,gender,email,number from users`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        console.log(results);
        return callback(null, results);
      }
    );
  },

  /**
   * Service to get user by id
   * @param {*} id
   * @param {*} callback
   */
  getUserById: (id, callback) => {
    pool.query(
      `select id,firstName,lastName,gender,email,number from users where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results); //to get 1st row => results[0] can be added
      }
    );
  },

  /**
   * Service to update a user [id]
   * @param {*} data
   * @param {*} callback
   */
  updateUser: (data, callback) => {
    pool.query(
      `update users set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id=?`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results); //to get 1st row => results[0] can be added
      }
    );
  },

  /**
   * Service to delete a user
   * @param {*} data
   * @param {*} callback
   */
  deleteUser: (data, callback) => {
    pool.query(
      `delete from users where id=?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  /**
   * Service to get user by email
   * @param {*} email
   * @param {*} callback
   */
  getUserByEmail: (email, callback) => {
    pool.query(
      `select * from users where email=?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
};
