const express = require('express');
const dirPath = require('path').dirname(require.main.filename);
const cnxBD = require(dirPath + '/APP/cnxBD');
const urls = require(dirPath + '/APP/urls.js');
const views = require(dirPath + '/APP/views.js');
const repoSQL = require(dirPath + '/APP/repoSQL.js');
const instrucoes = new repoSQL();
require('dotenv/config');

class config{
    constructor(server){
        server.use(express.json());
        
        instrucoes.getInit();
        
        new urls(server,new views());        
    
        server.use('/static',express.static(dirPath + '/estaticos'));
    
        server.listen(process.env.PORTA, process.env.HOST, () => {
            
            console.log(`
            ...
            Servidor no ar
            ...`
            );

        });
    
    }
}

module.exports = config;
