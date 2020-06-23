const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// import routers
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log("Connected to DB")
);

// Middleware
app.use(express.json());
// Route Middleware - everything in the auth route has the string prefix
app.use("/api/user", authRoute);
// when someone comes to /api/posts, use the postRoute ()
app.use("/api/posts", postRoute);

app.listen(8000, () => console.log("Server is listening on 8000..."));
