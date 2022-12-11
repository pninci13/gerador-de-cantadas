async function loadModals() {

    let text = "";

    currUser = await getUser();
    let cantadasTops = await sortCantadas();
    document.getElementById("pickupGrid").innerHTML = "";
    document.getElementById("bestFlirt").innerText = cantadasTops[0].cantada;

    document.body.innerHTML +=     `<div id="pickup-modal" class="modal fade" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modal-title">Suas Notificações</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>${cantadasTops[0].cantada}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success" data-bs-dismiss="modal">Ok</button>
            </div>
          </div>
        </div>
    </div>`

    for (var i = 1; i < cantadasTops.length; i++) {
      text +=
        `<div class="item generated-pickup" data-bs-toggle="modal" data-bs-target="#pickup-modal_${i}">${cantadasTops[i].cantada}</div><button onclick="sendViaPut(${cantadasTops[i].num})" class="icon-btn">
        <i class="icons bi-bookmark"></i></button>`
      addModalClick(cantadasTops[i], i);
    }
  
    document.getElementById("pickupGrid").innerHTML += text;
  }
  
  function addModalClick(cantada, i) {
    document.body.innerHTML += `<div id="pickup-modal_${i}" class="modal fade" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-title">Cantada</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>${cantada.cantada}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-bs-dismiss="modal">Ok</button>
          </div>
        </div>
      </div>
    </div>`
  }


async function sortCantadas() {
    let req = {
      method: 'GET'
    }
  
    const result = await fetch('/sortCantadas', req)
      .then((response) => response.json());
  
    return result;
  }

async function sendViaPut(cantada_Num) {
    let flert = { num: cantada_Num, cantada: "", numFavoritados: 0 }
    console.log("VIA PUT: " + flert.num);

    let req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flert)
    };

    const result = await fetch('/attCantada', req)
        .then((response) => response.json());

    return result;
}