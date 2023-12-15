const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes.js");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT;

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

require("./models/user");

require("./config/passport")(passport);

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
