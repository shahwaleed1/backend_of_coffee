const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')
const dburl = 'mongodb://localhost:27017';
const dbdata = 'day_4'

let client;
let dbInstance

async function dbsetup(){
    if (!client || ! client.isConnected){
        try{
            client = new MongoClient(dburl, { useUnifiedTopology: false},{ useNewUrlParser: true });
            await client.connect();
            dbInstance = client.db(dbdata);
            console.log("Connected with MongoDB");
        }
        catch(err){
            console.error('Error to Connection with MongoDB:',err);
            throw err;
        }
    }
    return dbInstance; 
}

module.exports = { dbsetup }

