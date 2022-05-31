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
            await db.run(instrucao,params,function(err, row) {
              if (err==null){
                retorno = 'ok';
              }
            });
            break;
          case "exec":
            await db.exec(instrucao,params, function(err, row) {
              retorno= {row};
            });
            break;
          case "each":
            retorno = [];
            await db.each(instrucao,params,function(err, row) {
              var obj= {row};
              retorno.push(obj);
            });
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