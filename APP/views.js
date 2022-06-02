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
            res.json({'erro': 'Dados incompletos'});

        }else{
            let user = banco.each('user',[username, senha]);
            user.then(user => {
                if (user[0].status == 'erro') {
                    res.json({'erro': 'Usuario ou senha incorretos'});
                }else{
                    Entrar(user[0].return, res);
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
        let resp = banco.run('novoUser',[username, senha, nome]);
        resp.then(resp => {
            console.log(resp);
            if (resp[0].status == 'erro') {
                res.json({'erro': 'ocorreu algum erro'});
            }else{
                
                res.json({'success': 'Usuario cadastrado'});
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
            res.json({'Conversas' : list});
        })   
    }
}

module.exports = views;