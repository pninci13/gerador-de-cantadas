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


app.post("/cadastroUsuario", function (req, res) {
    dbController.addUser(req);
    res.sendFile(__dirname + "/public/index.html");
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

app.post('/login', async (req,res) => {

    let user = await dbController.findUser(req.body.user, req.body.password);
    console.log("User: " + user);
    if(user != undefined){
        console.log("VAI PRO INDEX");
        res.sendFile(__dirname + "/public/index.html");
    } else{
        console.log("VAI PRO LOGIN");
        res.sendFile(__dirname + "/public/login.html");
        // window.alert("Credenciais Inválidas");
    }

   
    // res.end();
})


app.get("/listarUsuarios", function (req, res) {
    console.log("Listando usuarios: ");
    var query = {};
    dbController.findUser(query);

    res.sendFile(__dirname + "/public/index.html");

});