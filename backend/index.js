const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("CONNECTED TO MONGO DB");
});
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("*", (req, res, next) => {
  res.status(404).json({
    message: 'API not found'
  })
})

// app.get('/logout', (req, res) => {
//   res.clearCookie('token');
//   return res.json({Status : "success"});
// })
app.listen(8000, () => {
  console.log("Server is running");
});
