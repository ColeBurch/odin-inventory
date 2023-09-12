const express = require("express");
const router = express.Router();

router.get("/products", (req, res, next) => {
  // get all products
});

router.post("/products", (req, res, next) => {
  // create a new product
});

router.update("/products/:id", (req, res, next) => {
  // update a product
});

router.delete("/products/:id", (req, res, next) => {
  // delete a product
});

module.exports = router;
