const User = require("../public/User");
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://0.0.0.0:27017/";
let MONGO_CONFIG = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

function connectDB(){
    MongoClient.connect(url, MONGO_CONFIG,
        function (err, db) {
          if (err) throw err;
          console.log("Base de dados criada");
          db.close();
        }
      )
}

function addUser(req){
    MongoClient.connect(url, function (err, db) {
        if (err)
            throw err;
        
        var dbo = db.db("mydb");
        var myobj = new User(req.body.loginInput, req.body.senhaInput);
        
        dbo.collection("customers").insertOne(myobj, function (err, res) {
          if (err) throw err;
          console.log(myobj._usuario + " foi cadastrado");
          db.close();
        });
      });
}

function find(query){
    MongoClient.connect(url, function (err, client) {

        var db = client.db("mydb");
        var collection = db.collection("customers");
       
        var cursor = collection.find(query);
    
        cursor.forEach(
          function (doc) {
            console.log(doc);
          },
          function (err) {
            client.close();
          }      
        );
      });
}


module.exports = { 
  find,
  addUser,
  connectDB
}