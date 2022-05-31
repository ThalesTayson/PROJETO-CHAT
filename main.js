const config = require(__dirname + '/APP/config.js');

const express = require('express');


const server = express();


new config(server);



