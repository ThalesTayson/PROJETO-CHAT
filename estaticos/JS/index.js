function cadastrar() {
    let username = document.getElementById("username").value;
    let senha = document.getElementById("senha").value;

    var data =  JSON.stringify({'username': username, 'senha': senha});

    $.ajax({
        url:"/logar",
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

    var btnLogar = document.getElementById('btnLogar');

    btnLogar.addEventListener("click", function (event) {
        cadastrar();
    }, true);
    
}