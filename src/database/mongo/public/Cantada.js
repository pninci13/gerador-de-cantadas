class Cantada{
    _num
    _cantada
    _numFavoritados

    static _listaCantadas = [
        {
            num: 0,
            cantada: "Quando abre vaga para eu me candidatar a ser o grande amor da sua vida?",
            favoritados: "21"
        },
        {
            num: 1,
            cantada: "Você é o sol do meu verão. Quando te vejo, é derreter o coração.",
            favoritados: "14"   
        },
        {
            num: 2,
            cantada: "Você diz: “Você tem um mapa?” Ela responde: “Não, por quê?”Você diz: “Porque me perdi no brilho dos seus olhos.”",
            favoritados: "37"   
        },
        {
            num: 3,
            cantada: "Você diz: “Havia dois ursos o Beijaeu e o Mebeija e então o Beijaeu morreu. Quem sobrou?”",
            favoritados: "100"   
        }
    ]

    constructor(num, cantada){//cadastrar uma cantada nova
        this.num = num;
        this._cantada=cantada;
        this._numFavoritados=0;
        Cantada._listaCantadas.push(this);
    }
}

module.exports = Cantada;