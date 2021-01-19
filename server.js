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

app.post("/api/notes", (req, res) => {
    console.log(req.body);

    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8",(err, file) => {
        if(err){
            throw(err)
        }

        const data = JSON.parse(file);

        data.push(req.body);

        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(data), err => {
            if(err){
                throw(err)
            }

            res.status(200).json(data);
        })
        
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join( __dirname, "./public.index.html"));
})

app.listen(PORT, ()=>{
    console.log(`Server running on localhost:${PORT}`);
})