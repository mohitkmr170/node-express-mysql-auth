const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7); //To remove bearer, 7 char + 1 space
      verify(token, process.env.JWT_KEY, (err, decodedToken) => {
        if (err) {
          res.json({
            success: 0,
            message: "Invalid token",
          });
        } else {
          next(); //Middleware that can be called to make any API authenticated API
        }
      });
    } else {
      res.json({
        success: 0,
        message: "Access denied! Unauthorized user",
      });
    }
  },
};
