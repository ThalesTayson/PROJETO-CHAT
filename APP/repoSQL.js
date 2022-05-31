const Promise = require('bluebird');

fs = Promise.promisifyAll(require("fs"));
const dirPath = require('path').dirname(require.main.filename);
const cnxBD = require(dirPath + '/APP/cnxBD.js');
const db = new cnxBD();

async function exec(str, metodo, ...params){
    await fs.readFileAsync(dirPath + str)
        .then(function(data) {
            db.run(data.toString(), metodo, params);
        })
    ;
}

class repoSQL{
    
    init = "/SQL/init.sql";
        
    novoChat = "/SQL/Funcoes/novoChat.sql";

    novoGrupo = "/SQL/Funcoes/novoGrupo.sql";

    enviaMensagem = "/SQL/Funcoes/enviaMensagem.sql";

    listAmigos = "/SQL/Funcoes/listAmigos.sql";

    listChat = "/SQL/Funcoes/listChat.sql";

    novoUser = "/SQL/Funcoes/novoUser.sql";

    user = "/SQL/Funcoes/getUser.sql";

    getInit(){return exec(this.init,'run');}

    getUser(username,senha){
        return exec(this.user, 'exec',[username,senha]);
    }
    
    getNovoChat(){return exec(this.novoChat);}

    getNovoGrupo(){return exec(this.novoGrupo);}

    getEnviaMensagem(){return exec(this.enviaMensagem);}

    getListAmigos(){return exec(this.listAmigos);}

    getListChat(){return exec(this.listChat);}

    getNovoUser(){return exec(this.novoUser);}
    
}

module.exports = repoSQL;