
async function Sair(req, res){
    res.clearCookie('Token');
    res.redirect('/login');
}

module.exports = Sair;