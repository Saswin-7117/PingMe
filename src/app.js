const express = require("express");
const app = express();

app.use("/hello",(req,res) =>{
    res.send("Testing");
    console.log("From server")
})
app.listen(7777,()=>{
    console.log("Server listening");
});
