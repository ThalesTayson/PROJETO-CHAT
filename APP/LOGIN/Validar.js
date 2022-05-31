const JWT = require('jsonwebtoken');

async function Validar(req, res, next){
    auth = null;
    try {
        auth = req.cookie.Token;    
    } catch (error) {
        return res.send({erro:{login: 'Não Autorizado'}});
    }
    

    if ( typeof(auth) == 'undefined' || auth == ''){
        return res.send({erro:{login: 'Não Autorizado'}});
    } else {
        try {
            Token = await JWT.verify(auth, 'sauhsuhasuha');
            next();
        } catch (err) {
            return res.send({erro:{login: 'Não Autorizado'}});
            
        }
    }
}

module.exports = Validar;