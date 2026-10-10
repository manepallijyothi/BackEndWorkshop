const Product = require("../models/products");

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch(err) {
       next(err);
    }
}

exports.getProduct = async (req, res, next) => {
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
        next(err);
    }
}

exports.createProduct = async (req, res, next) => {
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

        const product = await Product.create({
            ...req.body,
            createdBy: req.user.id
        });
        return res.status(201).json(product);
   } catch (err) {
        next(err)
   }
}



exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if(String(product.createdBy) !== req.user.id){
            return res.status(403).json({
                error: "You can only change your own products"
            });
        }

        delete req.body.createdBy;
        const updated = await Product.findByIdAndUpdate(
            req.params.id, req.body,
            {
                 returnDocument: "after", runValidators: true
            }
        );
        res.status(200).json(product);
    } catch(err) {
        next(err);
    }
}

exports.deleteProduct =  async (req, res) => {
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
}