//========================================================
//Configuracoes do server
const host = "127.0.0.1";
const porta = "3000";

//======================================================== 
//Configurando pagina com express
const express = require('express'); 
const app = express();
app.use("/", express.static(__dirname + "/public"));

//========================================================
//Configurando body-parser
const bodyParser = require("body-parser");
const { json } = require('body-parser');
const User = require('./public/scripts/User');
const Cantada = require('./public/scripts/Cantada');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//========================================================
//Importando modulos e criando banco de dados

const dbController = require(__dirname + "/db/dbController.js");

//Configurando server

app.get('/', function (req, res) { });

app.listen(porta, function () {
    dbController.connectDB();

    console.log(`Servidor rodando em: http://${host}:${porta}`);
});




//========================================================
app.get("/cadastroCantada", async function (req, res) {
    await dbController.addCantada(req);
    res.sendFile("https://master.d1y1pgoxyydtk6.amplifyapp.com/" + "index.html"); //
});


app.get("/listarCantadas", function (req, res) {
    console.log("Listando cantadas: ");
    var query = {};
    dbController.findCantada(query);

    res.sendFile("https://master.d1y1pgoxyydtk6.amplifyapp.com/" + "index.html");

});




app.get("/listarUsuarios", function (req, res) {
    console.log("Listando usuarios: ");
    var query = {};
    dbController.findUser(query);

    res.sendFile("https://master.d1y1pgoxyydtk6.amplifyapp.com/" + "index.html");

});

app.get("/cantadaAleatoria", async(req,res)=>{
    console.log("Tentando achar cantada aleatoria");

    let cantada = await dbController.findRandomCantada();

   res.send(cantada);
    
   res.end();


   

});

app.post('/login', async (req,res) => {
    
    _usuario = req.body.usuario;
    _senha = req.body.senha;

    let user = await dbController.findUser(_usuario, _senha);

    if(user != -1){
        res.send({username: user._usuario});
    } else{
        res.send({username: -1});
    }

    res.end();
});

app.post("/cadastroUsuario", async (req, res) => {

    _usuario = req.body.usuario;
    _senha = req.body.senha;

    await dbController.addUser(_usuario,_senha);
    res.status(201);
    res.send();
    res.end();
});

app.put("/attCantada", async(req,res)=>{
    var cantada = req.body.cantada;

    console.log("do put: " + cantada);

    dbController.findCantada(cantada);
});