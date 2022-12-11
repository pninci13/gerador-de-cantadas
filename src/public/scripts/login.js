async function validLogin(){
    let name = document.getElementById('user').value;
    let passwd = document.getElementById('password').value;
    
    if(name.length > 0 && passwd.length > 0){
        let user = {usuario: name, senha: passwd};
        let username = await sendViaPost(user);
        
        document.getElementById('errorMsg').innerText = "";
        if(username != -1){
            location = 'http://127.0.0.1:3000';
        } else{
            alert("Credenciais Inválidas");
        }
    } else {
        document.getElementById('errorMsg').style.color = 'black';       
        document.getElementById('errorMsg').innerText = "Preencha todos os campos";
    }
}

async function sendViaPost(user){
    let res = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    const result = await fetch('/login', res)
    .then((response) => response.json())
    .then((data) => data.username);

    return result;
}