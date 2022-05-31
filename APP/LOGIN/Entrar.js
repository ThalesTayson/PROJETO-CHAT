const dirPath = require('path').dirname(require.main.filename);
const thenables = require('bluebird/js/release/thenables');
const res = require('express/lib/response');
const JWT = require('jsonwebtoken');

const repoSQL = require(dirPath + '/APP/repoSQL.js');
const instrucoes = new repoSQL();

async function Entrar(body){
    const {username, senha} = body;

    if (!username || !senha){
        return {erro: 'Dados incompletos'}
    }

    user = await instrucoes.getUser(username, senha);
    console.log(user);
    
    if (user == null) {
        return {erro: 'Usuario ou senha incorretos'}
    }

    Token = await JWT.sign({
        id: user.Id,
        nome: user.Nome,
        usuario: user.Usuario
    }, 'sauhsuhasuha')

    res.cookie('Token', Token);
    res.sendStatus(200);
}

module.exports = Entrar;