let currUser;

async function loadModals() {
    currUser = await getUser();
    console.log("USER: " + JSON.stringify(currUser._cantadasFavoritadas));
    document.getElementById("pickupGrid").innerHTML = "";
    let text = "";
    for (var i = 0; i < currUser._cantadasFavoritadas.length; i++) {
      text +=
        `<div class="item saved-pickup" data-bs-toggle="modal" data-bs-target="#pickup-modal_${i}">${currUser._cantadasFavoritadas[i].cantada}</div>
        <button type="button" class="rm-btn">Remove</button>`
      addModalClick(currUser._cantadasFavoritadas[i], i);
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