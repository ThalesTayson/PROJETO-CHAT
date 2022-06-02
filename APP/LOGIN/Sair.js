
async function Sair(req, res){
    res.clearCookie('Token');
    res.redirect('/');
}

module.exports = Sair;