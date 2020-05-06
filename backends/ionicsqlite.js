const frappe = require('frappejs');
const Database = require('frappejs/backends/database');
const Observable = require('frappejs/utils/observable');

module.exports = class IonicSqlite extends Database{
    constructor() {
      super();
    }

    addOne(doctype,data,num,db){
      var y = '('+'?, '.repeat(num-1)+'?)';
      console.log('insert data: ',data);
      return db.executeSql(`INSERT INTO ${doctype} VALUES ${y}`,data).then(res => {
        console.log("Inserted entry!!!");
        return res;
      })
      .catch(err => {
        console.log('error: ', err);
      });
    }

    getAll(doctype,condtion,db){
      return db.executeSql(`SELECT * FROM ${doctype} where ${condtion}`, []).then(data => {
        let items = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            items.push(data.rows.item(i));
          }
        }
        console.log("All items received!");
        return items;
      }, err => {
        console.log('Error: ', err);
        return [];
      })
    }

    deleteOne(doctype,old_name,db){
      return db.executeSql(`DELETE FROM ${doctype} WHERE name=?`,[old_name])
      .then(res => {
        console.log("Deleted!");
        return res;
      })
      .catch(err => {
        console.log('error: ', err);
      });
    }

    getOne(doctype,name,db){
      return this.database.executeSql(`SELECT * FROM ${doctype} WHERE name=?`,[name])
      .then(data => {
        //console.log(data.rows.length);
        let temp = data.rows.item(0);
        console.log("One value received");
        return temp;
      })
      .catch(err => {
        console.log('error: ',err);
      });
    }

  }
