require('dotenv/config');
const dirPath = require('path').dirname(require.main.filename);
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

function resposta(err, row) {
  if (err==null){
    retorno = 'ok';
  }
  if (row==null){
    retorno= {row};
  }
  console.log(retorno);
  return retorno;
}

class cnxBD{

    constructor(){
      this.dirDatabase = dirPath + process.env.DATABASE;

    };

    run = async function(instrucao, metodo, ...params) {
      let parametros = [instrucao, resposta];
      if (params != null){
        parametros = [instrucao, params, resposta];
        
      }

      let retorno = null;
      try {
        
        const db = await sqlite.open({ filename: this.dirDatabase, driver: sqlite3.Database });
        
        switch (metodo) {
          case "run":
            if (params.toString() != ''){
              
              retorno = await db.run(instrucao, params, resposta);
            }else{
              console.log('hehe');
              retorno = await db.run(instrucao, resposta);
            }

            break;
          case "exec":

            if (params != null){
              retorno = await db.run(instrucao, params, resposta);
            }else{
              retorno = await db.run(instrucao, resposta);
            }

            break;
          case "each":
            retorno = [];
            
            if (params != null){
              retorno.push(await db.run(instrucao, params, resposta));
            }else{
              retorno.push(await db.run(instrucao, resposta));
            }
            
            break;
        }
        console.log(retorno);
        await db.close();

      } catch (error) {
        console.log(error);
      }
      return retorno;
    }
    
}

module.exports = cnxBD;