async function validNewUser(){
    let user = document.getElementById('user').value;
    let passwd = document.getElementById('password').value;
    let confirmedPassword = document.getElementById("confirmPassword").value;

    if(passwd==confirmedPassword){

        let newUser = {
            usuario: user,
            senha: passwd
        }

        let confirmPost = await sendViaPost(newUser);

        if(user.length > 0 && passwd.length > 0 && confirmedPassword.length > 0){
            document.getElementById('errorMsg').innerText = "";
            if(confirmPost != -1){
                location = 'https://master.d1y1pgoxyydtk6.amplifyapp.com';
            } else{
                alert("Credenciais Inválidas");
            }
        } else {
            document.getElementById('errorMsg').style.color = 'black';       
            document.getElementById('errorMsg').innerText = "Preencha todos os campos";
        }   
    }
    else{
        document.getElementById('errorMsg').style.color = 'black';       
        document.getElementById('errorMsg').innerText = "Senhas nao batem";
    }
}

async function sendViaPost(user){
    let res = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    const result = await fetch('/cadastroUsuario', res)
    .then((response) => response.status)
    .then((data) => data);

    return;
}