require('dotenv/config');
const dirPath = require('path').dirname(require.main.filename);
const Entrar = require('./LOGIN/Entrar');
const Sair = require('./LOGIN/Sair');
const cnxBD = require('./cnxBD');
const banco = new cnxBD();


class views{

    
    constructor(){

        setTimeout(banco.run, 2000, 'init');

    }
    entrar = async function(req,res){
        let {username, senha} = req.body;

        if (!username || !senha){
            res.json({'return': 'Dados incompletos'});

        }else{
            let consulta = banco.each('user',[username, senha]);
            consulta.then(resposta => {
                if (resposta.status == 'sucesso'){
                    let user = resposta.return;
                    Entrar(user, res);
                }else{
                    res.json({'return': 'Usuario ou senha incorretos'});
                }
            });
        }

    }

    sair = async function(req,res){
        res.send(await Sair(req,res));
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
        let consulta = banco.run('novoUser',[username, senha, nome]);
        consulta.then(resposta => {
            
            if (resposta.status == 'sucesso'){
                if (resposta.return.mudancas == 1){
                    res.json({'return': 'Usuario cadastrado'});
                }else{
                    res.json({'return': 'ocorreu algum erro'});
                }
            }else{
                res.json({'return': 'Falha'});
            }
        })
    }
    getConversas = function(req,res){
        const {username} = req.body;
        let list = banco.each('listChat', [username]);
        list.then(list => {
            res.json({'Conversas' : list});
        })   
    }
    getAmigos = function(req,res){
        const {username} = req.body;
        let list = banco.each('listAmigos', [username]);
        list.then(list => {
            res.json({'Amigos' : list});
        })   
    }
}

module.exports = views;