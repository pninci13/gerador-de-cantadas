const User = require("../public/scripts/User");
const Cantada = require("../public/scripts/Cantada");
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



let db;
const loadDB = async () => {
  if (db) {
    return db;
  }
  try {
    const client = await MongoClient.connect(url);
    db = client.db('mydb');
  } catch (err) {
    Raven.captureException(err);
  }
  return db;
};





async function addCantada(req) {

  let db = await loadDB();
  db.collection("cantadas").insertMany(Cantada._listaCantadas, function (err, res) {
    if (err) throw err;
    db.close();
  });
}

async function findCantada(cantada) {

  const db = await loadDB();

  var collection = db.collection("cantadas");

 

  var cursor = collection.updateOne({ cantada }, { $inc: { favoritados: 1 } });
  console.log("chegou aqui 2");




}

async function addUser(user, passwd) {


  const db = await loadDB();

  var myobj = new User(user, passwd);
  db.collection("customers").insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log(myobj._usuario + " foi cadastrado");
  });
}

async function findUser(user, passwd) {
  let customer;

  const db = await loadDB();
  var collection = db.collection("customers");

  customer = await collection.findOne({ _usuario: user });

  if (!(String(customer._senha) === String(passwd))) {
    customer = -1;
  }

  return customer;
}

async function findRandomCantada() {


  const db = await loadDB();
  var collection = db.collection("cantadas");

  let d = new Date();
  let time = d.getMilliseconds();
  let count = await collection.countDocuments().then();
  let index = Math.floor(Math.random() * time) % count;
  console.log("COLL COUNT: " + count);
  console.log("INDEX: " + index);
  var query = { num: index };

  var cantada = await collection.findOne(query);
  return cantada;


}

module.exports = {
  findUser,
  addUser,
  addCantada,
  findCantada,
  findRandomCantada,
  connectDB
}