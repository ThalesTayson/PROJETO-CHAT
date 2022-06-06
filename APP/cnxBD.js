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
  
  async init(){
    const result = []; 
    let consulta = run('init')
    consulta.then((resp) =>{
      result.push(resp)
    })
    return new Promise.all(result)
      .then((list)=> list.return);

  }

  async getUser(params = []){
    const promise = each('user', params);
    return promise.then(
      resp => {return resp} 
    );
    
  }

  async getAmigos(userId){
    const promise = each('getAmigos', userId);
    return promise.then(
      resp => {
        if (resp.status = "sucesso"){
          return resp.return;
        }else {
          return null;
        }
      }
    );
  }
  
  async ifNotExistUser(username){
    const promise = each('ifNotExistUser', [username]);
    return promise.then(
      resp => {
        if (resp.status == "falha"){
          if (resp.return == "0 Resultado") {
            return 'Disponivel';
          }
          return 'Indisponivel';
        }else{
          return 'Indisponivel';
        }
      }
    )
      .catch(err =>{
        console.log(err);
        return 'Indisponivel';
      })
  ;
  }

  async getConversas(userId){
    const promise1 = [];
    promise1.push(each('BatePapoPorUsuario', [userId]));
    const BatePapos = [];

    await new Promise.all(promise1)
      .then(batePapos => {
        let promise2 = null;
        if (batePapos[0].status == "sucesso"){
          batePapos[0].return.forEach(batePapo => {
            if (batePapo.grupo == "TRUE"){
              promise2 = each('GrupoPorBatePapo', [batePapo.id]);
            }else{
              promise2 = each('UsuarioPorUsuario',[batePapo.id, userId]);
            }
            BatePapos.push(
              promise2.then(resp =>{
                if (resp.status == "sucesso"){
                  batePapo.nome = resp.return.nome
                }else{
                  batePapo.nome = "indefinido"
                }
                return batePapo;
            }))
              
          });
        }

    })
    
    return new Promise.all(BatePapos)
      .then(resp =>{
        if (resp.length == 0){
          return null;
        }
        return resp;
      })
    

  }
}
async function run(metodo, params = []){
  let result = [];
  const sql = InstrucoesSQL[metodo];
  try {
    const db = new sqlite3.Database(dirDatabase);
    await db.serialize(() => {
      if (params.toString() == '') {  
        
        sql.forEach(sql => {

          result.push(db.run(sql, (err) =>{
              if (err) {return err};
              return this.changes;
            })
          );
        });

      } else {
        sql.forEach(sql => {
          result.push(db.run(sql, params, (err) =>{
            if (err) {return err};
            return this.changes;
          })
          );
        });
      }
    })
    db.close();
  } catch (error) {
    console.log(error);
  }
  return await Promise.all(result)
    .then(result=> {
      return {status : 'sucesso', return : {mudancas: result}};
    })
    .catch(err => {
      console.log(err);
      return {status : 'falha', return : err};
      
    })
  ;
}
async function each(metodo, params = []){
  const sql = InstrucoesSQL[metodo];
  let result = [];
  let promisses = [];
  try {
    const db = await sqlite.open({ filename: dirDatabase, driver: sqlite3.Database });

    if (params.toString() == '') {
      await sql.forEach(sql =>{
        promisses.push(db.each(sql, (err, row) => {

          result.push(row);

        }));
      })
      
    } else {
      await sql.forEach(sql => {
        promisses.push(db.each(sql, params, (err, row) => {
          if(err){
            console.log(err);
          }
          result.push(row);

        }))
      })
      
    }
    db.close();
  } catch (error) {
    console.log(error);
  }

  return await Promise.all(promisses)
    .then(list=> {
      const retorno = result[0]
      if (list[0] > 0){
        if (list[0] ==1){
          let resp = {status : 'sucesso', return : retorno};
          return resp;
        };
        return {status : 'sucesso', return : result};
      }else{
        return {status : 'falha', return : '0 Resultado'};
      }
    })
    .catch((err) =>{
      console.log('deu ruim')
      return {status : 'falha', return : err};
    })
  ;
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
            InstrucoesSQL[s] = [];
            strjson[s].toString().split(';').forEach((str) => {
              if (str != ''){
                InstrucoesSQL[s].push(str);
              }
            });
              
          });
      }));
  
}

LibSQL();

module.exports = cnxBD;