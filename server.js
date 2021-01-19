const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.end("main page");
})

app.listen(PORT, ()=>{
    console.log(`Server running on localhost:${PORT}`);
})