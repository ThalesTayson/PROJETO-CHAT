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
            message("Resposta: ",response['resposta']);
        },
        error:function (message){
            alert("Falhou:"+message);
        }
    });
}
function message(titulo,body) {
    let elemMessage = document.getElementById("message");
    let elemTitulo = document.getElementById("titulo");
    let elemBody = document.getElementById("body");
    elemMessage.style.display = '';
    elemTitulo.textContent = titulo;
    elemBody.textContent = body;
}

window.onload = function () {

    var btnLogar = document.getElementById('btnLogar');

    btnLogar.addEventListener("click", function (event) {
        cadastrar();
    }, true);
    
}