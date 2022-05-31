const dirPath = require('path').dirname(require.main.filename);
const Entrar = require(dirPath + '/APP/LOGIN/Entrar.js');
const Sair = require(dirPath + '/APP/LOGIN/Sair');
const repoSQL = require(dirPath + '/APP/repoSQL.js');
const instrucoes = new repoSQL();

class views{
    
    entrar = async function(req,res){
        console.log(req.body);
        res.send(await Entrar(req.body));
    }

    sair = async function(req,res){
        res.send(await Sair());
    }

    login = async function(req,res){
        res.sendFile('login.html',{ root: dirPath + '/Templates' });
    }

    home = function(req,res){
        res.sendFile('home.html',{ root: dirPath + '/Templates' });
    }

    cadastro = function(req,res){
        res.sendFile('Cadastrar.html',{ root: dirPath + '/Templates' });
    }
    
    cadastrar = async function(req,res){
        const {nome, senha, username} = req.body;
        let resp = database.novoUser(nome, username, senha);
        if (resp=='ok'){
            res.send(await Entrar(req.body));
        }else{
            res.json({'resposta' : resp});
        }
    }
    getConversas = function(req,res){
        let list = database.listChat;
        list.then(list => {
            res.json({'Conversas' : list});
        })   
    }
    getAmigos = function(req,res){
        let list = database.listAmigos;
        list.then(list => {
            res.json({'Conversas' : list});
        })   
    }
}

module.exports = views;