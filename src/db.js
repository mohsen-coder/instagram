import { isArray } from 'util';
import { resolve } from 'url';

export const db = (function () {
  // check database is exist or not
  function dbExist(db) {
    if (localStorage.getItem(db) === null) {
      return false;
    }
    return true;
  }
  // create database
  function createDB(dbName, value) {
    localStorage.setItem(dbName, value);
  }
  function editDB(dbName, value) {
    let arrToJson = value;
    if(isArray(value)){
      arrToJson = JSON.stringify(value)
    }
    localStorage.setItem(dbName, arrToJson);
  }
  // set to database
  function setDB(db, value) {
    let dbContent = localStorage.getItem(db);
    if(isJson(dbContent)){
      dbContent = JSON.parse(dbContent);
      dbContent.push(value);
      localStorage.setItem(db, JSON.stringify(dbContent));
    }else{
      localStorage.setItem(db, value);
    }
    
  }
  // get from database
  async function getDB(db) {
    const result =  new Promise(function(resolve, reject){
      let dbContent = localStorage.getItem(db);
      if (isJson(dbContent)) {
        dbContent = JSON.parse(dbContent);
      }
      resolve(dbContent);
    });

    return await result;
  }

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  return {
    dbExist,
    createDB,
    setDB,
    getDB,
    isJson
  }
})();