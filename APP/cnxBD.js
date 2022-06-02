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
            return {status : 'success', mudancas : obj.changes};
          } )
          .catch((err) => {
            return {status : 'erro', erro : err};
          })
        );
      } else {
        result.push(await db.run(sql, params)
          .then((obj) => {
            return {status : 'success', mudancas : obj.changes};
          } )
          .catch((err) => {
            return {status : 'erro', erro : err};
          })
        );
      }

      db.close();
    } catch (error) {
      console.log(error);
    }

    await Promise.all(result)
      .then(result=> console.log(result))

    return result;
  }
  async each(metodo, params = []){
    const sql = InstrucoesSQL[metodo];
    let result = [];

    try {
      const db = await sqlite.open({ filename: dirDatabase, driver: sqlite3.Database });
      if (params.toString() == '') {
      const db = await sqlite.open({ filename: dirDatabase, driver: sqlite3.Database });
        await db.each(sql, (err, row) => {
          if (err != null){
            result.push({status : 'erro', erro: err});
          }else{
            result.push({status : 'success', return : row});
          }
        });
      } else {
        await db.each(sql, params, (err, row) => {
          if (err != null){
            result.push({status : 'erro', erro: err});
          }else{
            result.push({status : 'success', return : row});
          }
        });
      }
      db.close();
    } catch (error) {
      console.log(error);
    }

    await Promise.all(result)
      .then(result=> console.log(result))

    return result;
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