const express = require("express");
const path = require( "path" );
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use( express.static( "public" ));

app.get("/notes", (req, res) =>{
    res.sendFile(path.join( __dirname, "./public/notes.html"));
})

app.get("/api/notes", (req, res)=>{
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8",(err, data) => {
        if(err){
            throw(err)
        }
        
        res.status(200).json(JSON.parse(data))
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join( __dirname, "./public.index.html"));
})

app.listen(PORT, ()=>{
    console.log(`Server running on localhost:${PORT}`);
})