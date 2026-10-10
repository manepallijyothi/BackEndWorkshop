const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
    },
    name: {
        type: String,
        required: true,
        trim: true 
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
},{
    timestamps : true
});



module.exports = mongoose.model("Product",productSchema)