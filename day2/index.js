const express = require("express");
const productRoutes = require("./routes/product.js");
const app = express();


const port =3001;

app.use(express.json());

app.use("/products", productRoutes);

app.use((req,res) =>{
    res.status(404).json({
        message: "Page not found"
    })
})
app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
})