const dirPath = require('path').dirname(require.main.filename);
const JWT = require('jsonwebtoken');

async function Entrar(user, res){
    Token = await JWT.sign({
        id: user.Id,
        nome: user.Nome,
        usuario: user.Usuario
    }, 'auhdsiaduhfajkshfkljahsfkdjhaksjdbnmzsncxvjklsj')
    res.cookie('Token', Token);
    res.json({return : 'Autorizado'})
}

module.exports = Entrar;