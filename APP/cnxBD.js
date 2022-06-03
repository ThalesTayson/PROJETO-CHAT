require('dotenv/config');
const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');
const dirPath = require('path').dirname(require.main.filename);
const Promise = require('bluebird');
fs = Promise.promisifyAll(require("fs"));
const repoSQL = require('./repoSQL');
const InstrucoesSQL = {};

const dirDatabase = dirPath + process.env.DATABASE

class cnxBD{
  
  async run(metodo, params = []){
    let result = [];
    const sql = InstrucoesSQL[metodo];
    try {
      const db = await sqlite.open({ filename: dirDatabase, driver: sqlite3.Database });

      if (params.toString() == '') {
        result.push(await db.run(sql)
          .then((obj) => {
            return obj.changes;
          } )
          .catch((err) => {
            return err;
          })
        );
      } else {
        result.push(await db.run(sql, params)
          .then((obj) => {
            return obj.changes;
          } )
          .catch((err) => {
            return err;
          })
        );
      }

      db.close();
    } catch (error) {
      console.log(error);
    }
    return await Promise.all(result)
      .then(result=> {
        return {status : 'sucesso', return : {mudancas: result}};
      })
      .catch(err => {
        return {status : 'falha', return : err};
      })
    ;
  }
  async each(metodo, params = []){
    const sql = InstrucoesSQL[metodo];
    let result = [];
    let promisses = [];
    try {
      const db = await sqlite.open({ filename: dirDatabase, driver: sqlite3.Database });

      if (params.toString() == '') {

        promisses.push(await db.each(sql, (err, row) => {

          result.push({row});

        }));
      } else {

        promisses.push(await db.each(sql, params, (err, row) => {

          result.push({row});

        }))
      }
      db.close();
    } catch (error) {
      console.log(error);
    }

    return await Promise.all(promisses)
      .then(list=> {
        if (list[0] > 0){
          if (list[0] ==1){return {status : 'sucesso', return : result[0]}};
          return {status : 'sucesso', return : result};
        }else{
          return {status : 'falha', return : '0 Resultado'};
        }
      })
      .catch((err) =>{
        return {status : 'falha', return : err};
      })
    ;
  }
}

LibSQL = function(){
  const list = [];
  let keyss = Object.keys(repoSQL);
  keyss.forEach((s) =>{
      list.push(fs.readFileAsync(dirPath + repoSQL[s])
      .then(function(data) {
          return {[s] : data.toString()};
      }));
  });
  Promise.all(list)
      .then(results => results.forEach(strjson => {
          let keysjson = Object.keys(strjson);
          keysjson.forEach((s) =>{
              InstrucoesSQL[s] = strjson[s].toString();
          });
      }));
  
}

LibSQL();

module.exports = cnxBD;