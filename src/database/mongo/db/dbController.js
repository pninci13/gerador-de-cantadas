const User = require("../public/User");
const Cantada = require("../public/Cantada");
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://0.0.0.0:27017/";
let MONGO_CONFIG = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

//======================================================== 
//Conecta ao banco
function connectDB() {
  MongoClient.connect(url, MONGO_CONFIG,
    function (err, db) {
      if (err) throw err;
      console.log("Base de dados criada");
      db.close();
    }
  )
}

//======================================================== 
//Controla usuarios
function addUser(req) {
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

function findUser(query) {
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

//======================================================== 
//Controla cantadas
function addCantada(req) {
  MongoClient.connect(url, function (err, db) {
    if (err)
      throw err;

    var dbo = db.db("mydb");
    //var myobj = new Cantada(req.body.cantadaInput);

    // dbo.collection("cantadas").insertOne(myobj, function (err, res) {
    //   if (err) throw err;
    //   console.log("Uma cantada foi cadastrada.");
    //   db.close();
    // });


    dbo.collection("cantadas").insertMany(Cantada._listaCantadas, function (err, res) {
      if (err) throw err;
      console.log("Uma cantada foi cadastrada.");
      db.close();
    });
  });
}

function findCantada(query) {

  MongoClient.connect(url, function (err, client) {

    var db = client.db("mydb");
    var collection = db.collection("cantadas");

    var cursor = collection.find(query).sort({ favoritados: 1 });

    cursor.forEach(
      function (doc) {
        console.log(doc);
      },
      function (err) {
        client.close();
      }
    );
    
  });

  // findRandomCantada();
   
}

function findRandomCantada() {
  MongoClient.connect(url, async function (err, client) {

    var db = client.db("mydb");
    var collection = db.collection("cantadas");
    
    let d = new Date();
    let time = d.getMilliseconds();
    let count = await collection.countDocuments().then();
    let index = Math.floor(Math.random() * time) % count;
    console.log("COLL COUNT: " + count);
    console.log("INDEX: " + index);
    var query = { num: index};

    var cursor = await collection.find(query);
    console.log("CURSOR: " + cursor);

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
  findUser,
  addUser,
  addCantada,
  findCantada,
  connectDB
}