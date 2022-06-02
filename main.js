
const config = require('./APP/config');
const express = require('express');

function main(){
    const PATH = __dirname;

    const server = express();

    config(server, PATH);
}

main();




