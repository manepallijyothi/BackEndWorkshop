//Day - 3 steps
//npm i mongoose dotenv packages

const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        const connection = await mongoose.connect(process.env.Mongodb_url);
        //console.log(connection)
        console.log("DB connection success");
    }
    catch(err){
        console.log("DB connection failed");
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;