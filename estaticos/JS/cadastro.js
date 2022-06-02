function cadastrar() {
    let username = document.getElementById("username").value;
    let senha = document.getElementById("senha").value;
    let nome = document.getElementById("nome").value;
    
    var data =  JSON.stringify({'username': username, 'senha': senha, 'nome': nome });

    $.ajax({
        url:"/Cadastrar",
        type:"POST",
        contentType: "application/json",
        dataType:"json",
        data:data,
        success:function (response){
            alert("Resposta: " + response.erro);
        },
        error:function (message){
            alert("Falhou:"+message);
        }
    });
}


window.onload = function () {

    var btnLogar = document.getElementById('btnCadastrar');

    btnLogar.addEventListener("click", function (event) {
        cadastrar();
    }, true);
    
}