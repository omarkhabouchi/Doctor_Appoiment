const express = require ("express");
const dotenv = require ("dotenv");
const cors = require ("cors");
const connectDB = require("./config/db");



dotenv.config();


const app = express();
const port = 3000;

app.use(express.json);
connectDB();
app.use(cors())

// app.get('/',(req,res)=>{
//     res.send("omaryto")
// })

app.listen(port, () =>{
    console.log("hllo omar");
})

