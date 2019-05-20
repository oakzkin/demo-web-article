var express = require('express')
var app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')

// Connection URL
const url = process.env.MONGO_URL

// Create a new MongoClient
const client = new MongoClient(url)

// Database Name
const dbName = 'article'

let articleCollection = null

// Use connect method to connect to the Server
client.connect(function(err) {
    
    if(err){
        console.log('connect fail')
        return
    }
    console.log("Connected successfully to server");
  
    const db = client.db(dbName);
    // Get the documents collection
    articleCollection = db.collection('article'); // collection = table
    
  
  });


  
const _error = message => {
    return {
        status: 'error',
        message: message
    }
}
  




app.use(express.static('public'))
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/article', (req, res) => {
    
    if(typeof req.body.title === 'undefined'){
        return res.json(_error('Title field is required'))
        /*return res.json({
            'Title':'Error',
            'Message':'Missing Title'
        })*/
        //return //end this function like else
    }

    if(req.body.title.trim().length === 0){
        return res.json(_error('Title field cannot be empty'))
    }

    if(typeof req.body.description === 'undefined'){
        return res.json(_error('Description field is required'))
    }

    if(req.body.description.trim().length === 0){
        return res.json(_error('Description field cannot be empty'))
    }

    articleCollection.insertOne({
        'Title' : req.body.title,
        'Description' : req.body.description
    }, function (result){
        res.json(result)
    })
  
})

app.get('/article', function (req, res) {
    const pagesize = 2
    const page = Math.max(req.query.page || 1, 1)
    const offset = (page - 1) * pagesize

    articleCollection.find({}).skip(offset).limit(pagesize).toArray((err, docs) => {
        if(err){
            return res.json(_error(err))
        }
        res.json({
            status : 'ok',
            page : page,
            data : docs
        })
    })
})






app.get('/', function (req, res) {
    
  res.send('Hello World xxxxx ... xxxxxx')
})

app.get('/article', (req, res) => {
    
  res.send('Article....')
})


app.listen(3000)