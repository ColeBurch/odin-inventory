const express = require("express");
require("dotenv").config();

const app = express();

const port = process.env.PORT;

app.use((req, res, next) => {
  res.send("Welcome to my API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
