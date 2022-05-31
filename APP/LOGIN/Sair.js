const res = require("express/lib/response");

async function Sair(){
    res.clearCookie('Token');
    res.redirect('/');
}

module.exports = Sair;