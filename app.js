require("dotenv").config();
const express = require("express");
const app = express();

const userRouter = require("./api/users/user.router");

app.use(express.json());

app.use("/v1/users", userRouter);

// app.get("/v1", (req, res) => {
//   res.json({
//     success: true,
//     message: `This is Auth REST API's @ ${process.env.APP_PORT}`,
//   });
// });

app.listen(process.env.APP_PORT, () => {
  console.log("Server is up and running on PORT : ", process.env.APP_PORT);
});
