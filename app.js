//Get the environment variables
require('dotenv').config()

//Get the modules that we need
let express = require('express')
let path = require('path')
let parser = require('body-parser')
let request = require('request')

let port = process.env.port || 80
let app = express()
const MongoClient = require('mongodb').MongoClient

var db = undefined
let col_name = 'test'

console.log(`db address: ${process.env.MONGODB_URI}`)

MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
  if (err) {
    console.log(err)
    process.exit(1) 
  } 
  console.log('connected to mongo')
  db = client.db()
})

app.listen(port, (err) => {if (err) console.log(err); else console.log("started listening on " + port)})

app.use(express.static("static"))
app.use(parser.urlencoded({extended: true}))

app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'hbs')

app.get("/", (req, res) => {res.sendFile(path.join(__dirname, "/static/index.html"))})
app.get("/review", (req, res) => {res.send('WIP')}) //insert callback

// Until authentication happens, the collection name is just going to be the ip address
let collection_name = 'test'

app.post("/db", (req, res) => {
  // return debug information when dev property is passed through
  if (req.body.hasOwnProperty('dev'))
  {
    return res.json(JSON.stringify(req.body))
  }

  /*
  let ip = (req.headers['x-forwarded-for'] || '').split(',').pop() || req.connection.remoteAddress 
  collection_name = ip
*/

  let date_started = req.body.date_started
  let time_started = req.body.time_started
  
  let time_focused = req.body.time_focused

  const col = db.collection(collection_name)

  col.insertOne({'date_started': date_started, 
                 'time_started': time_started,
                 'time_focused': time_focused},
                          
                 (err, result) => {
    if (err) {
      res.status(500).send(err)
      return console.log(err)
    }

    console.log(`inserted ${result.insertedCount} instance of stopwatch data successfully`)
    res.status(201).send(`inserted ${result.insertedCount} instance of stopwatch data successfully`)
  })
})

app.get("/db", (req, res) => {res.json({'message':'hi'})})

app.get("/db/:date_started", (req, res) => 
{
  //Select a collection. 
/*
  let ip = (req.headers['x-forwarded-for'] || '').split(',').pop()  || req.connection.remoteAddress 
  collection_name = ip
*/

  let col = db.collection(collection_name)

  // Query
  col.find({date: {$eq: req.date_started}}).toArray((err, results) => {
    if (err) return console.log(err)
    res.json(JSON.stringify(results)) 
  })
})