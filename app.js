let express = require('express');
let path = require('path');
let parser = require('body-parser');

let port = process.env.port || 80;

let app = express();

app.listen(port, (err) => {if (err) console.log(err); else console.log("started listening on " + port);});

app.use(express.static("static"));
app.use(express.static("html"));

app.get("/", (req, res) => {res.sendFile(path.join(__dirname, "/static/index.html"));});
