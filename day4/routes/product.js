const express = require("express");
const c = require("../controller/productController")
const router = express.Router();

router.get("", c.getProducts);

router.get("/:id", c.getProduct)

router.post("", c.postProduct);

router.put("/:id", c.updateProduct);

router.delete("/:id",c.deleteProduct) 

module.exports = router;