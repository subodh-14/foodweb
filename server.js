const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Dish = require("./modals/userSchema");
const app = express();

mongoose.connect('mongodb://localhost:27017/food-web',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db =mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

app.use(bodyParser.json());
app.use(cors({origin:"http://localhost:3000"}))

app.get('/dish',async (req,res)=>{
    const dishes = await Dish.find({});
    res.send(dishes);
   
})


if(process.env.NODE_ENV =="production"){
    app.use(express.static("client/build"));
}


app.listen(process.env.PORT||3030,()=>{
    console.log("server running on port 3030");
})