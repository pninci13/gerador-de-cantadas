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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//========================================================
//Importando modulos e criando banco de dados

const dbController = require(__dirname + "/db/dbController.js");
let currUser = {_usuario: "meu pau", _senha: "meusovo", cantadas: []};
//Configurando server

app.get('/', function (req, res) {});

app.listen(porta, function () {
    // dbController.connectDB();

    console.log(`Servidor rodando em: http://${host}:${porta}`);
});




//========================================================
app.post("/cadastroCantada", function (req, res) {
    dbController.addCantada(req);
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/listarCantadas", function (req, res) {
    console.log("Listando cantadas: ");
    var query = {};
    dbController.findCantada(query);

    res.sendFile(__dirname + "/public/index.html");

});


app.get("/listarUsuarios", function (req, res) {
    console.log("Listando usuarios: ");
    var query = {};
    dbController.findUser(query);

    res.sendFile(__dirname + "/public/index.html");

});

app.get("/cantadaAleatoria", async(req,res)=>{
    let cantada = await dbController.findRandomCantada();
    res.send(cantada);
    res.end();
});

app.post('/login', async (req,res) => {
    
    _usuario = req.body.usuario;
    currUser = {_usuario: req.body.usuario, _senha: req.body.senha};
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
    dbController.addUser(req);
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/attCantada", async(req,res)=>{
    let cantadaNum = req.body.num;
    console.log("do put: " + req.body.num);

    let cantada = dbController.likeCantada(cantadaNum);

    res.send(JSON.stringify(cantada));
});

app.get('/user', function (req, res) {
    res.send(JSON.stringify(currUser));
});