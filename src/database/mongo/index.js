//========================================================
//Configuracoes do server
const host = "127.0.0.1";
const porta = "3000";

//======================================================== 
//Configurando pagina com express
const express = require('express');
const app = express();
app.use(express.static('public'));

//========================================================
//Configurando body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//========================================================
//Importando modulos e criando banco de dados

const dbController = require(__dirname + "/db/dbController.js");

//Configurando server

app.get('/', function (req, res) { });

app.listen(porta, function () {

  dbController.connectDB();

  console.log(`Servidor rodando em: http://${host}:${porta}`);
});

// app.post("/cadastro", function (req, res) {

//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     var myobj = new User(req.body.loginInput, req.body.senhaInput);
//     dbo.collection("customers").insertOne(myobj, function (err, res) {
//       if (err) throw err;
//       console.log("Um usuario foi cadastrado");
//       db.close();
//     });
//   });
//   res.sendFile(__dirname + "/public/index.html");
// });

app.post("/cadastro", function (req, res) {
  dbController.addUser(req);
  res.sendFile(__dirname + "/public/index.html");
});


app.get("/listar", function (req, res) {
  console.log("Listando usuarios: ");
  var query = {};
  dbController.find(query);

  res.sendFile(__dirname + "/public/index.html");

});