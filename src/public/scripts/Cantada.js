const dbController = require("../../db/dbController");

class Cantada{
    _num
    _cantada
    _numFavoritados

    static _listaCantadas = [
        {
            num: 0,
            cantada: "Quando abre vaga para eu me candidatar a ser o grande amor da sua vida?",
            favoritados: 0
        },
        {
            num: 1,
            cantada: "Você é o sol do meu verão. Quando te vejo, é derreter o coração.",
            favoritados: 0   
        },
        {
            num: 2,
            cantada: "Você diz: “Você tem um mapa?” Ela responde: “Não, por quê?”Você diz: “Porque me perdi no brilho dos seus olhos.”",
            favoritados: 0  
        },
        {
            num: 3,
            cantada: "Você diz: “Havia dois ursos o Beijaeu e o Mebeija e então o Beijaeu morreu. Quem sobrou?”",
            favoritados: 0  
        },
        {
            num: 4,
            cantada: "Você acredita em amor à primeira vista? Nem eu. Espera, deixa eu te olhar de novo.",
            favoritados: 0  
        },
        {
            num: 5,
            cantada: "Eu não sou a Casas Bahia, mas prometo dedicação total a você.",
            favoritados: 0  
        },
        {
            num: 6,
            cantada: "Sou novo na cidade, pode me ensinar o caminho até seu coração?",
            favoritados: 0  
        },
        {
            num: 7,
            cantada: "Me passa o seu Twitter? Meu pai disse que eu devo seguir o meu sonho.",
            favoritados: 0  
        },
        {
            num: 8,
            cantada: "Pronto, já estou aqui. Quais são seus outros 2 desejos?",
            favoritados: 0  
        },
        {
            num: 9,
            cantada: "Pensava que felicidade começava com F, mas começa com você.",
            favoritados: 0  
        },
        {
            num: 10,
            cantada: "Pesquisas apontam que agente junto é erro de gramática, mas a gente separado é erro do destino.",
            favoritados: 0  
        },
        {
            num: 11,
            cantada: "Posso tirar uma foto sua? É para mostrar ao Papai Noel o que eu quero de presente.",
            favoritados: 0  
        },
        {
            num: 12,
            cantada: "Eu tenho uma memória terrível. Felizmente, você é inesquecível.",
            favoritados: 0  
        },
        {
            num: 13,
            cantada: "Onde é que eu deixo meu currículo para concorrer à vaga de amor da sua vida?",
            favoritados: 0  
        },
        {
            num: 14,
            cantada: "Desculpa, você estava falando comigo? Não? Então, por favor, comece a falar.",
            favoritados: 0  
        },
        {
            num: 15,
            cantada: "Fica comigo que eu faço esquecer o João. Que João? Viu só, já está esquecendo…",
            favoritados: 0  
        },
        {
            num: 16,
            cantada: "Vontade de fazer aquilo que começa com s: ser o amor da sua vida.",
            favoritados: 0  
        },
        {
            num: 17,
            cantada: "Você não é massagem cardíaca, mas reanima o meu coração!",
            favoritados: 0  
        },
        {
            num: 18,
            cantada: "Espero que você saiba estacionar, porque tem vaga no meu coração",
            favoritados: 0  
        },
        {
            num: 19,
            cantada: "As urnas do meu coração foram apuradas, só da você nele.",
            favoritados: 0  
        },
        {
            num: 20,
            cantada: "Esqueci como beija, me lembra como faz!",
            favoritados: 0  
        },
        {
            num: 21,
            cantada: "Troquei de operadora, meu plano agora é você!",
            favoritados: 0  
        },
        {
            num: 22,
            cantada: "Promoção relâmpago do beijo, pede 1 e leva 2.",
            favoritados: 0  
        },
        {
            num: 23,
            cantada: "Minha boca não é biscoito, mas pode ser seu passatempo.",
            favoritados: 0  
        },
        {
            num: 24,
            cantada: "Você tem band-aid? Porque ralei meu joelho caindo de amores por você!",
            favoritados: 0  
        },
        {
            num: 25,
            cantada: "Pensei que só Nestle fabricava tentação, mas pelo visto seus pais também!",
            favoritados: 0  
        },
        {
            num: 26,
            cantada: "Se eu me afogar na sua beleza tenho direito a respiração boca a boca?",
            favoritados: 0  
        },
        {
            num: 27,
            cantada: "Não gosto de matemática, mas de você eu dou conta!",
            favoritados: 0  
        },
        {
            num: 28,
            cantada: "Você não é GPS quebrado, mas me deixou perdido nesse teu sorriso.",
            favoritados: 0  
        },
        {
            num: 29,
            cantada: "Tudo que eu falo é meme. Quer levar algo pro coração, leva eu!",
            favoritados: 0  
        },
        {
            num: 30,
            cantada: "Seu nome deveria ser oxigênio pois não consigo viver sem você!",
            favoritados: 0  
        },
        {
            num: 31,
            cantada: "Sua beleza é igual cartão black, sem limites!",
            favoritados: 0  
        },
        {
            num: 32,
            cantada: "Me chama de cimento e construa algo concreto comigo.",
            favoritados: 0  
        },
        {
            num: 33,
            cantada: "Você deveria entrar em Hogwarts, porque o que você faz com o meu coração só pode ser bruxaria.",
            favoritados: 0  
        },
        {
            num: 34,
            cantada: "Eu perdi o número do meu telefone… Me empresta o seu?",
            favoritados: 0  
        },
        {
            num: 35,
            cantada: "Me chama de previsão do tempo e diz que tá rolando um clima.",
            favoritados: 0  
        }
    ]

    constructor(num, cantada){//cadastrar uma cantada nova
        this.num = num;
        this._cantada=cantada;
        this._numFavoritados=parseInt(0);
        Cantada._listaCantadas.push(this);
    }

    static async incrementarFavoritados(cantada){
        console.log("tentei");
        for(var i = 0;i<Cantada._listaCantadas.length;i++){
            if(cantada==Cantada._listaCantadas.cantada){
                console.log("deu bom");
            }
        }
        await dbController.findCantada(cantada);
    }
}

module.exports = Cantada;