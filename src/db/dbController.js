const User = require("../public/scripts/User");
const Cantada = require("../public/scripts/Cantada");
let MongoClient = require('mongodb').MongoClient;
let getUser = require("../public/scripts/getUser");
let url = "mongodb://0.0.0.0:27017/";
let MONGO_CONFIG = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

//Controla usuarios
async function addUser(user, passwd) {

  const db = await loadDB();
  var collection = db.collection("customers");

  let user1 = await collection.findOne({ _usuario: user });

  console.log(user1);

  if (user1 == null) {

    var myobj = new User(user, passwd);
    db.collection("customers").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log(myobj._usuario + " foi cadastrado");
    });
    return 1;
  }else{
    console.log("usuario ja existe, cadastro abortado");
    return -1;
  }
}


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

//Adiciona cantadas
async function addCantada(req) {
  
  let db = await loadDB();
  db.collection("cantadas").insertMany(Cantada._listaCantadas, function (err, res) {
    if (err) throw err;
    db.close();
  });
}

async function findCantada(query) {

  let db = await loadDB();
  let collection = db.collection("cantadas");
  var cantada = collection.findOne(query);
  return cantada;
}

async function likeCantada(currUser,cantada_Num) {

  const db = await loadDB();
  let collection = db.collection("cantadas");
  let collectionCustomers = db.collection("customers");
  let cantada = await collection.findOne({num: cantada_Num});

  collectionCustomers.updateOne({_id: currUser._id}, {$push: {_cantadasFavoritadas: cantada}});

  collection.updateOne({ num: cantada_Num }, { $inc: { favoritados: 1 } });

  cantada = await collection.findOne({num : cantada_Num});
  
  return cantada;
}


async function listCantadas(){
  let db = await loadDB();
  let collection = db.collection("cantadas");
  var cursor = collection.find(query).sort({ favoritados: 1 });

    cursor.forEach(
      function (doc) {
        console.log(doc);
      },
      function (err) {
        client.close();
      }
    );
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
  likeCantada,
  listCantadas,
  // connectDB
}