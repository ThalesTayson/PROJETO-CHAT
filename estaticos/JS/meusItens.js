function getItens() {

    $.ajax({
        url:"/getItens",
        type:"GET",
        contentType: "application/json",
        dataType:"json",
        success:function (response){
            response['lista'].forEach(geraLinha);
        },
        error:function (message){
            alert("Falhou:"+message);
        }
    });
}
function geraLinha(item) {
    let element = document.createElement("tr");
    let coluna1 = document.createElement("td");
    let coluna2 = document.createElement("td");
    let tabela = document.getElementById("tabela");
    coluna1.textContent = item.id;
    coluna2.textContent = item.nome;
    element.appendChild(coluna1);
    element.appendChild(coluna2);
    tabela.appendChild(element);
}
window.onload = function () {

    getItens();
    
}