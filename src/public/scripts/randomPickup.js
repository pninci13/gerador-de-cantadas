async function receiveFromGet(){
    let res = {
        method: 'GET'
    };

    const result = await fetch('/cantadaAleatoria', res)
    .then((response) => response.json()).then((data)=>data.cantada);

    

    return result;
}

async function setInDocument(){

    let cantada = await receiveFromGet();

    console.log(cantada);

    document.getElementById("testeteste").innerText=cantada;
}