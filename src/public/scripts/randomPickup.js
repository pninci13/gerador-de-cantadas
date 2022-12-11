let cantadas = [];

function loadModals(){
    document.getElementById("pickupGrid").innerHTML = "";
    let text = "";
    for(var i = 0; i < cantadas.length; i++){
        text += 
        `<div class="item generated-pickup" data-bs-toggle="modal" data-bs-target="#pickup-modal_${i}">${cantadas[i]}</div><button class="icon-btn">
        <i class="icons bi-bookmark"></i></button>`
        addModalClick(cantadas[i], i);
    }

    document.getElementById("pickupGrid").innerHTML += text;
}

async function setInDocument(){
    let cantada = await receiveFromGet();
    cantadas.push(cantada);
    loadModals();
}

function addModalClick(cantada, i){
    document.body.innerHTML +=  `<div id="pickup-modal_${i}" class="modal fade" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal-title">Cantada</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>${cantada}</p>
        </div>
        <div class="modal-footer">
          <button onclick="takePickup(\"${cantada}\"" type="button" class="btn btn-success" data-bs-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>`
}

async function receiveFromGet(){
    let res = {
        method: 'GET'
    };

    const result = await fetch('/cantadaAleatoria', res)
    .then((response) => response.json()).then((data)=>data.cantada);

    return result;
}

async function takePickup(cantada){
   var cantadaTest = await sendViaPost(cantada);

   console.log(cantadaTest);

}


async function sendViaPost(cantada){
    let res = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(cantada)
    };

    const result = await fetch('/attCantada', res)
    .then((response) => response.json())
    .then((data) => data);

    return result;
}