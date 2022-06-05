const express = require('express');
const cookie = require('cookie-parser');
require('dotenv/config');

express.request.headers
async function config(server, PATH){
    
    const urls = await require('./urls');
    const views = await require('./views');

    await server.use(function (req, res, next) {
        console.log(req.method + ' ' + req.headers.host + req.url);
        next();
      });
      
    await server.use(express.json());
    await server.use(cookie());
    
    await new urls(server,new views());

    await server.use('/static',express.static(PATH + '/estaticos'));

    await server.listen(process.env.PORTA, process.env.HOST,() => {
        
        console.log(`
        ...
        Servidor no ar
        -> http://localhost:3000/
        ...`
        );

    });

}

module.exports = config;
