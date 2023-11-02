const express = require('express')
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");


const dotenv = require("dotenv");

dotenv.config();


const PORT = 5000

 const app = express();

 app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);




mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successful");
  })
  .catch((err) => {
    console.log(err);
  });




 app.listen(PORT,async()=>{
    console.log(`Server is running on ${PORT}`)
 })