const express=require('express');
const app=express();

const port=3000;

app.use(express.json());

app.use((req,res, next)=>{
    console.log(req.method);
    console.log(req.url);
    next();
})
app.get('/',(req,res)=>{
    res.send("Hello Jyo...!");
})

app.get('/about',(req,res) =>{
    res.send("About page");
});

app.get('/contact',(req,res)=>{
    res.send("Contact Page");
});

app.get('/api/hello',(req,res)=>{
    res.json({
        message : "hello Jyo"
    });
});

app.get('/api/missing',(req,res)=>{
    res.status(404).json({
        error : "page not found"
    })
});

app.get("/product/:id",(req,res)=>{
    const productid=req.params.id;
    res.status(200).json({
        id: productid
    });
});

app.get("/users/:userid/orders/:orderid",(req,res)=>{
    const userId = req.params.userid;
    const orderId = req.params.orderid;
    res.status(200).json({
        userId: userId,
        orderId : orderId
    });
});

app.get("/Products",(req,res)=>{
    const query =req.query;
    const Category=query.category;
    const Maxprice=query.maxprice;
    res.status(200).json({
        category: Category,
        maxprice: Maxprice
    });
});

app.post('/api/login',(req,res)=> {
    const email=req.body.email;
    const password = req.body.password;
    res.status(200).json({
        email: email,
        message: "Login Successful"
    });
});
app.listen(port,()=>{
    console.log(`server is running on the port : ${port}`);
});