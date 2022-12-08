const bcrypt = require('bcryptjs');

class User{
    _usuario
    _senha
    _cantadasFavoritadas = [];//lista de cantadas do usuario

    constructor(usuario,senha){

        const salt = bcrypt.genSaltSync(10);
        const senhaHash = bcrypt.hashSync(senha, salt);
        this._usuario=usuario;
        this._senha=senhaHash;
    }

    static favotirarCantadas = function(cantada){
        this._cantadasFavoritadas.push(cantada);//dar push numa cantada
    }
}


module.exports = User;