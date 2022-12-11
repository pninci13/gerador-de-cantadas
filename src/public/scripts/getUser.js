async function getUser() {
    let req = {
      method: 'GET'
    }
  
    const result = await fetch('/user', req)
      .then((response) => response.json());
  
    document.getElementById('userEmail').innerText = result._usuario;
  
    console.log(JSON.stringify(result));
  
    return result;
  
  }

  module.exports={
    getUser
  }