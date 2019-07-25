//Get the environment variables
require('dotenv').config()

//Get the modules that we need
let express = require('express')
let path = require('path')
let parser = require('body-parser')
let moment = require('moment')

let port = process.env.port || 80
let app = express()
const MongoClient = require('mongodb').MongoClient

var db = undefined

console.log(`db address: ${process.env.MONGODB_URI}`)

MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
  if (err) return console.log(err)
  console.log('connected to mongo')
  db = client.db()
})

app.listen(port, (err) => {if (err) console.log(err); else console.log("started listening on " + port)})

app.use(express.static("static"))

app.get("/", (req, res) => {res.sendFile(path.join(__dirname, "/static/index.html"))})
app.get("/review", //insert callback)

app.post("/db", (req, res) => {
   
})

app.get("/db/:date", (req, res) => 
{
  //Select a collection. 
  //It's fixed right now but it can be user ID 
  //when this supports authentication

  db.collection()

  // Construct the Date object 
  let date = new Date(req.params.date)

  // Query
  let results = col.find({$eq: date})

  res.JSON()
})

