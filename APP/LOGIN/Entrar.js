const dirPath = require('path').dirname(require.main.filename);
const JWT = require('jsonwebtoken');

async function Entrar(user, res){
    Token = await JWT.sign({
        id: user.Id,
        nome: user.Nome,
        usuario: user.Usuario
    }, 'sauhsuhasuha')

    res.cookie('Token', Token);
    res.sendStatus(200);
}

module.exports = Entrar;