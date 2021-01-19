// import dependencies
const express = require("express");
const path = require( "path" );
const fs = require("fs");

// initialize server
const app = express();

// declare port for heroku and testing
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use( express.static( "public" ));

// route to display note.html
app.get("/notes", (req, res) =>{
    res.sendFile(path.join( __dirname, "./public/notes.html"));
})

// api routes

// show json for all notes
app.get("/api/notes", (req, res)=>{

    // get db.json
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8",(err, data) => {
        if(err){
            throw(err)
        }
        
        // send ok status parse file contents as json and send
        res.status(200).json(JSON.parse(data))
    })
})

// add note route
app.post("/api/notes", (req, res) => {

    // read db.json
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8",(err, file) => {
        if(err){
            throw(err)
        }

        // parse file as json
        const data = JSON.parse(file);

        // create note object from req.body
        const note = {...req.body};

        // add unique id as 1 + id number of max note
        note.id = parseInt(data[data.length-1].id);
        note.id ++;

        // add note to data
        data.push(note);

        // write new data to file
        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(data, null, 4), err => {
            if(err){
                throw(err)
            }

            // send ok status and new data
            res.status(200).json(data);
        })
        
    })
})

// delete note route
app.delete("/api/notes/:id", (req, res)=>{

    // read db.json
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8",(err, file) => {
        if(err){
            throw(err)
        }

        // parse file as json
        const data = JSON.parse(file);

        // find index of id in file
        for(i in data){
            if(data[i].id == req.params.id){
                // if found, remove from array
                data.splice(i, 1)
            }
        }        

        // write data to db.json
        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(data), err => {
            if(err){
                throw(err)
            }

            // send ok status and new data
            res.status(200).json(data);
        })
        
    })
})

// default route
app.get("*", (req, res) => {
    res.sendFile(path.join( __dirname, "./public.index.html"));
})

app.listen(PORT, ()=>{
    console.log(`Server running on localhost:${PORT}`);
})