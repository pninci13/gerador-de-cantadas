class Cantada{
    _cantada
    _numFavoritados
    static _listaCantadas = [
        {
            cantada: "Quando abre vaga para eu me candidatar a ser o grande amor da sua vida?",
            favoritados: "21"
        },
        {
            cantada: "Você é o sol do meu verão. Quando te vejo, é derreter o coração.",
            favoritados: "14"   
        },
        {
            cantada: "Você diz: “Você tem um mapa?” Ela responde: “Não, por quê?”Você diz: “Porque me perdi no brilho dos seus olhos.”",
            favoritados: "37"   
        },
        {
            cantada: "Você diz: “Havia dois ursos o Beijaeu e o Mebeija e então o Beijaeu morreu. Quem sobrou?”",
            favoritados: "100"   
        }]

    constructor(cantada){//cadastrar uma cantada nova
        this._cantada=cantada;
        this._numFavoritados=0;
        Cantada._listaCantadas.push(this);
    }
}

module.exports = Cantada;