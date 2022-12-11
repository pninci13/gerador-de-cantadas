const Cantada = require("./Cantada");

class User{
    _usuario
    _senha
    _cantadasFavoritadas = [];

    constructor(usuario, senha){
        this._usuario=usuario
        this._senha=senha
        this._cantadasFavoritadas = [];
    }
}
module.exports = User;