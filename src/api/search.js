const express = require("express");
const router = express.Router();

const products = [
  {
    product_id: 1,
    product_name: "Brinjal",
    product_price: 25,
    catagory_id: 1,
    image: "https://picsum.photos/300/200",
  },
  {
    product_id: 2,
    product_name: "Carrots",
    product_price: 20,
    catagory_id: 1,
    image: "https://picsum.photos/300/200",
  },
  {
    product_id: 3,
    product_name: "Apple Cider",
    product_price: 20,
    catagory_id: 2,
    image: "https://picsum.photos/300/200",
  },
  {
    product_id: 4,
    product_name: "Rum",
    product_price: 20,
    catagory_id: 2,
    image: "https://picsum.photos/300/200",
  },
  {
    product_id: 5,
    product_name: "Yum",
    product_price: 200,
    catagory_id: 2,
    image: "https://picsum.photos/300/200",
  },
  {
    product_id: 6,
    product_name: "Chicken",
    product_price: 200,
    catagory_id: 3,
    image: "https://picsum.photos/300/200",
  },
  {
    product_id: 7,
    product_name: "Chicken - 1/2 KG",
    product_price: 100,
    catagory_id: 3,
    image: "https://picsum.photos/300/200",
  },
  {
    product_id: 8,
    product_name: "Apple",
    product_price: 100,
    catagory_id: 4,
    image: "https://picsum.photos/300/200",
  },
];

router.get("/", (req, res) => {
  const product_name = req.query.product_name;
  const newProducts = products.filter((product) => (
    product.product_name.includes(product_name)
  ));
  res.json(newProducts);
});

module.exports = router;
