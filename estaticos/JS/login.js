function login() {
    let username = document.getElementById("username").value;
    let senha = document.getElementById("senha").value;

    var data =  JSON.stringify({'username': username, 'senha': senha});
    if(username =="" | senha == ""){
        alert("Usuario e senha são necessarios");
        return;
    }
    $.ajax({
        url:"/logar",
        type:"POST",
        contentType: "application/json",
        dataType:"json",
        data:data,
        success:function (response){
            if (response.return == "Autorizado"){
                window.location.href.replace("/");
            }else{
                alert(response.return);
            }
        },
        error:function (message){
            console.log(message);
            alert("Erro ao comunicar-se com o servidor.");
        }
    });
}


window.onload = function () {

    var btnLogar = document.getElementById('btnLogar');

    btnLogar.addEventListener("click", function (event) {
        login();
    }, true);
    
}