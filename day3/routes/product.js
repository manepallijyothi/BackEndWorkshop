const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch(err) {
        res.status(500).json({
            message: err.message,
        })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.post("", async (req, res) => {
   try {
        const {name, price} = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Name not found"
            })
        }

        if (!price) {
            return res.status(400).json({
                message: "price not found"
            })
        }

        const product = await Product.create(req.body)
        return res.status(201).json(product);
   } catch (err) {
        res.status(500).json({
            error: err.message
        });
   }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findByIdAndUpdate(id, req.body, {
            returnDocument: "after", runValidators: true
        });
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch(err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.status(200).json({
        message: "Product deleted successfully"
    })
}) 

module.exports = router;