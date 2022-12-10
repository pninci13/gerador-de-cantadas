const Cantada = require("./Cantada");

class User{
    _usuario
    _senha
    _cantadasFavoritadas = [];

    constructor(usuario, senha){
        this._usuario=usuario
        this._senha=senha
    }

    static adicionarFavoritadas = function(cantada){
       
        Cantada.incrementarFavoritados(cantada);
    }
}
module.exports = User;