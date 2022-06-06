
function verificaDisponibilidadeUser(username){
    let data = JSON.stringify({'username': username});

    const checkUser = document.getElementById("checkUser");

    $.ajax({
        url:"/verificaSeJaExisteUser",
        type:"POST",
        contentType: "application/json",
        dataType:"json",
        data:data,
        success:function (response){
            if(response.return == "Disponivel"){
                checkUser.textContent = String.fromCharCode(10003);
                checkUser.style.cssText = "font-weight: bold; color: green;";
                
            }else{
                checkUser.textContent = String.fromCharCode(10007);
                checkUser.style.cssText = "font-weight: bold; color: red;";
            }
            
        },
        error:function (message){
            alert("Falhou:"+message);
        }
    });
}
function cadastrar(data) {

    $.ajax({
        url:"/Cadastrar",
        type:"POST",
        contentType: "application/json",
        dataType:"json",
        data:data,
        success:function (response){
            if(response.return == "Usuario cadastrado"){
                alert("Usuario Cadastrado")
                window.location.href.replace("/");
            }
            
        },
        error:function (message){
            alert("Falhou:"+message);
        }
    });
}

function validaDados(username, nome, senha, confirmSenha){

    if(username.indexOf(" ") != -1){
        alert("Apelido deve ser simples, não pode conter espaços.");
        return;
    }
    
    if(confirmSenha == "")

    if (confirmSenha != senha){
        alert("As senhas digitadas não conferem");
        return;
    }
    
    let data =  JSON.stringify({'username': username, 'senha': senha, 'nome': nome });

    cadastrar(data);
}
window.onload = function () {
    var username = document.getElementById("username");
    var btnCadastrar = document.getElementById('btnCadastrar');


    btnCadastrar.addEventListener("click", function (event) {
        let senha = document.getElementById("senha").value;
        let confirmSenha = document.getElementById("confirmSenha").value;
        let nome = document.getElementById("nome").value;
        validaDados(username.value, nome, senha, confirmSenha);
    }, true);

    username.addEventListener("focusout", function (event) {
        if (username.value != "" | username.value != null){
            verificaDisponibilidadeUser(username.value);
        }
    })
    
}