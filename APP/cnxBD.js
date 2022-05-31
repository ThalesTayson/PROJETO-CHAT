require('dotenv/config');
const dirPath = require('path').dirname(require.main.filename);
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');


class cnxBD{

    constructor(){
      this.dirDatabase = dirPath + process.env.DATABASE;

    };

    run = async function(instrucao, metodo, ...params) {

      let retorno = null;
      try {
        
        const db = await sqlite.open({ filename: this.dirDatabase, driver: sqlite3.Database });
        
        switch (metodo) {
          case "run":
            if (params.toString() != ''){
              
              await db.run(instrucao, params, (err) => {
                if (err==null){
                  this.retorno = 'ok';
                }
              });

            }else{
              await db.run(instrucao, (err) => {
                if (err==null){
                  this.retorno = 'ok';
                }
              });
            }

            break;
          case "exec":

            if (params != null){
              await db.run(instrucao, params, (err,row) => {
                if (err==null){
                  this.retorno = 'ok';
                }
                if (row==null){
                  this.retorno= {row};
                }
              });
            }else{
              await db.run(instrucao, (err, row) => {
                if (err==null){
                  this.retorno = 'ok';
                }
                if (row==null){
                  this.retorno= {row};
                }
              });
            }

            break;
          case "each":
            retorno = [];
            
            if (params != null){
              await db.run(instrucao, params, (err, row) => {
                if (err==null){
                  this.retorno = 'ok';
                }
                if (row==null){
                  this.retorno.push({row});
                }
              });
            }else{
              await db.run(instrucao, (err, row) => {
                if (err==null){
                  this.retorno = 'ok';
                }
                if (row==null){
                  this.retorno.push({row});
                }
              });
            }
            
            break;
        }
        await db.close();

      } catch (error) {
        console.log(error);
      }
      return retorno;
    }
    
}

module.exports = cnxBD;