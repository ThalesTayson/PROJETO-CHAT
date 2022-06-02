const JWT = require('jsonwebtoken');

async function Validar(req, res, next){
    auth = null;
    try {
        auth = req.cookies.Token;    
    } catch (error) {
        return res.redirect('/login');
    }
    console.log(auth);

    if ( typeof(auth) == 'undefined' || auth == ''){
        return res.redirect('/login');
    } else {
        try {
            Token = await JWT.verify(auth, 'sauhsuhasuha');
            next();
        } catch (err) {
            return res.redirect('/login');
            
        }
    }
}

module.exports = Validar;