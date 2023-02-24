const express = require("express");
const path = require("path");

const router = express.Router();
const adminData = require("./admin");

router.get("/", (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  const products = adminData.products;
  // res.render("shop", { prods: products, pageTitle: "Shop", path: "/" });
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    acticeShop: true,
    productCSS: true,
  });
});

module.exports = router;
