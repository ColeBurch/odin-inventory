require("dotenv").config();

console.log(
  "This script populates some test products, categories, and product instances to your database."
);

const Product = require("./models/product");
const Category = require("./models/category");
const ProductInstance = require("./models/productInstance");

const products = [];
const productinstances = [];
const categories = [];

const mongoose = require("mongoose");
const product = require("./models/product");
mongoose.set("strictQuery", false);

const mongoDB = process.env.DB;

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createProducts();
  await createProductInstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function productCreate(index, name, price, category, summary) {
  const productdetail = {
    name: name,
    price: price,
    category: category,
    summary: summary,
  };

  const product = new Product(productdetail);
  await product.save();
  products[index] = product;
  console.log(`Added product: ${name}`);
}

async function productInstanceCreate(index, product, quantity, size, color) {
  const productinstancedetail = {
    product: product,
    quantity: quantity,
    size: size,
    color: color,
  };

  const productinstance = new ProductInstance(productinstancedetail);
  await productinstance.save();
  productinstances[index] = productinstance;
  console.log(`Added productinstance: ${product.name}`);
}

async function createCategories() {
  console.log("Adding Categories");
  await Promise.all([
    categoryCreate(0, "Tops", "Shirts, blouses, and sweaters"),
    categoryCreate(1, "Bottoms", "Pants, shorts, and skirts"),
    categoryCreate(2, "Dresses", "Dresses and jumpsuits"),
    categoryCreate(3, "Outerwear", "Jackets, coats, and vests"),
    categoryCreate(4, "Shoes", "Shoes and boots"),
    categoryCreate(5, "Accessories", "Jewelry, scarves, and hats"),
  ]);
}

async function createProducts() {
  console.log("Adding Products");
  await Promise.all([
    productCreate(
      0,
      "T-Shirt",
      20,
      categories[0],
      "A simple t-shirt for everyday wear"
    ),
    productCreate(
      1,
      "Button-Down Shirt",
      30,
      categories[0],
      "A button-down shirt for work or play"
    ),
    productCreate(
      2,
      "Sweater",
      40,
      categories[0],
      "A cozy sweater for cold days"
    ),
    productCreate(
      3,
      "Jeans",
      50,
      categories[1],
      "A pair of jeans for everyday wear"
    ),
    productCreate(
      4,
      "Shorts",
      30,
      categories[1],
      "A pair of shorts for warm days"
    ),
    productCreate(5, "Skirt", 40, categories[1], "A skirt for work or play"),
    productCreate(6, "Dress", 50, categories[2], "A dress for work or play"),
    productCreate(
      7,
      "Jumpsuit",
      60,
      categories[2],
      "A jumpsuit for work or play"
    ),
    productCreate(8, "Jacket", 70, categories[3], "A jacket for cold days"),
    productCreate(9, "Coat", 80, categories[3], "A coat for cold days"),
    productCreate(10, "Vest", 60, categories[3], "A vest for cold days"),
    productCreate(
      11,
      "Shoes",
      90,
      categories[4],
      "A pair of shoes for everyday wear"
    ),
    productCreate(
      12,
      "Boots",
      100,
      categories[4],
      "A pair of boots for cold days"
    ),
    productCreate(
      13,
      "Necklace",
      30,
      categories[5],
      "A necklace for everyday wear"
    ),
    productCreate(14, "Scarf", 20, categories[5], "A scarf for cold days"),
    productCreate(15, "Hat", 20, categories[5], "A hat for cold days"),
  ]);
}

async function createProductInstances() {
  console.log("Adding Product Instances");
  await Promise.all([
    productInstanceCreate(0, products[0], 10, "S", "White"),
    productInstanceCreate(1, products[0], 10, "M", "White"),
    productInstanceCreate(2, products[0], 10, "L", "White"),
    productInstanceCreate(3, products[0], 10, "S", "Black"),
    productInstanceCreate(4, products[0], 10, "M", "Black"),
    productInstanceCreate(5, products[0], 10, "L", "Black"),
    productInstanceCreate(6, products[1], 10, "S", "White"),
    productInstanceCreate(7, products[1], 10, "M", "White"),
    productInstanceCreate(8, products[1], 10, "L", "White"),
    productInstanceCreate(9, products[1], 10, "S", "Black"),
    productInstanceCreate(10, products[1], 10, "M", "Black"),
    productInstanceCreate(11, products[1], 10, "L", "Black"),
    productInstanceCreate(12, products[2], 10, "S", "White"),
    productInstanceCreate(13, products[2], 10, "M", "White"),
    productInstanceCreate(14, products[2], 10, "L", "White"),
    productInstanceCreate(15, products[2], 10, "S", "Black"),
    productInstanceCreate(16, products[2], 10, "M", "Black"),
    productInstanceCreate(17, products[2], 10, "L", "Black"),
    productInstanceCreate(18, products[3], 10, "S", "Blue"),
    productInstanceCreate(19, products[3], 10, "M", "Blue"),
    productInstanceCreate(20, products[3], 10, "L", "Blue"),
    productInstanceCreate(21, products[3], 10, "S", "Black"),
    productInstanceCreate(22, products[3], 10, "M", "Black"),
    productInstanceCreate(23, products[3], 10, "L", "Black"),
    productInstanceCreate(24, products[4], 10, "S", "Blue"),
    productInstanceCreate(25, products[4], 10, "M", "Blue"),
    productInstanceCreate(26, products[4], 10, "L", "Blue"),
    productInstanceCreate(27, products[4], 10, "S", "Black"),
    productInstanceCreate(28, products[4], 10, "M", "Black"),
    productInstanceCreate(29, products[4], 10, "L", "Black"),
    productInstanceCreate(30, products[5], 10, "S", "Blue"),
    productInstanceCreate(31, products[5], 10, "M", "Blue"),
    productInstanceCreate(32, products[5], 10, "L", "Blue"),
    productInstanceCreate(33, products[5], 10, "S", "Black"),
    productInstanceCreate(34, products[5], 10, "M", "Black"),
    productInstanceCreate(35, products[5], 10, "L", "Black"),
    productInstanceCreate(36, products[6], 10, "S", "Blue"),
    productInstanceCreate(37, products[6], 10, "M", "Blue"),
    productInstanceCreate(38, products[6], 10, "L", "Blue"),
    productInstanceCreate(39, products[6], 10, "S", "Black"),
    productInstanceCreate(40, products[6], 10, "M", "Black"),
    productInstanceCreate(41, products[6], 10, "L", "Black"),
    productInstanceCreate(42, products[7], 10, "S", "Blue"),
    productInstanceCreate(43, products[7], 10, "M", "Blue"),
    productInstanceCreate(44, products[7], 10, "L", "Blue"),
    productInstanceCreate(45, products[7], 10, "S", "Black"),
    productInstanceCreate(46, products[7], 10, "M", "Black"),
    productInstanceCreate(47, products[7], 10, "L", "Black"),
    productInstanceCreate(48, products[8], 10, "S", "Blue"),
    productInstanceCreate(49, products[8], 10, "M", "Blue"),
    productInstanceCreate(50, products[8], 10, "L", "Blue"),
    productInstanceCreate(51, products[8], 10, "S", "Black"),
    productInstanceCreate(52, products[8], 10, "M", "Black"),
    productInstanceCreate(53, products[8], 10, "L", "Black"),
    productInstanceCreate(54, products[9], 10, "S", "Blue"),
    productInstanceCreate(55, products[9], 10, "M", "Blue"),
    productInstanceCreate(56, products[9], 10, "L", "Blue"),
    productInstanceCreate(57, products[9], 10, "S", "Black"),
    productInstanceCreate(58, products[9], 10, "M", "Black"),
    productInstanceCreate(59, products[9], 10, "L", "Black"),
    productInstanceCreate(60, products[10], 10, "S", "Blue"),
    productInstanceCreate(61, products[10], 10, "M", "Blue"),
    productInstanceCreate(62, products[10], 10, "L", "Blue"),
    productInstanceCreate(63, products[10], 10, "S", "Black"),
    productInstanceCreate(64, products[10], 10, "M", "Black"),
    productInstanceCreate(65, products[10], 10, "L", "Black"),
    productInstanceCreate(66, products[11], 10, "US 8", "Blue"),
    productInstanceCreate(67, products[11], 10, "US 9", "Blue"),
    productInstanceCreate(68, products[11], 10, "US 10", "Blue"),
    productInstanceCreate(69, products[11], 10, "US 8", "Black"),
    productInstanceCreate(70, products[11], 10, "US 9", "Black"),
    productInstanceCreate(71, products[11], 10, "US 10", "Black"),
    productInstanceCreate(72, products[12], 10, "US 8", "Blue"),
    productInstanceCreate(73, products[12], 10, "US 9", "Blue"),
    productInstanceCreate(74, products[12], 10, "US 10", "Blue"),
    productInstanceCreate(75, products[12], 10, "US 8", "Black"),
    productInstanceCreate(76, products[12], 10, "US 9", "Black"),
    productInstanceCreate(77, products[12], 10, "US 10", "Black"),
    productInstanceCreate(78, products[13], 10, "18in", "Gold"),
    productInstanceCreate(79, products[13], 10, "20in", "Gold"),
    productInstanceCreate(80, products[13], 10, "22in", "Gold"),
    productInstanceCreate(81, products[13], 10, "18in", "Silver"),
    productInstanceCreate(82, products[13], 10, "20in", "Silver"),
    productInstanceCreate(83, products[13], 10, "22in", "Silver"),
    productInstanceCreate(84, products[14], 10, "18in", "Blue"),
    productInstanceCreate(85, products[14], 10, "20in", "Blue"),
    productInstanceCreate(86, products[14], 10, "22in", "Blue"),
    productInstanceCreate(87, products[14], 10, "18in", "Black"),
    productInstanceCreate(88, products[14], 10, "20in", "Black"),
    productInstanceCreate(89, products[14], 10, "22in", "Black"),
    productInstanceCreate(90, products[15], 10, "One-Size", "Blue"),
    productInstanceCreate(91, products[15], 10, "One-Size", "Black"),
  ]);
}
