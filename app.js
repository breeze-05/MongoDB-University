const { MongoClient } = require('mongodb');
const uri = require('./atlas_uri');
const consola = require('consola');
const { connect } = require('http2');
const { errorMonitor } = require('stream');
const { waitForDebugger } = require('inspector');
const prompt = require("prompt-sync")({ sigint: true });

// console.log(uri);

const client = new MongoClient(uri)
const dbname = "Playground"
const collectionName = "RobloxStats"

const collection = client.db(dbname).collection(collectionName);


const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbname} database`);
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
};

const robloxStats = {
  "robloxId": 3152840,
  "robux": 3750,
  "visits": 1000000000,
  "lastUpdated": new Date()
 }


const main = async () => {
  try {
    await connectToDatabase();
    let result = await collection.insertOne(robloxStats);
    console.log(`Successfully inserted ${result.insertedCount}`);
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  } finally {
    await client.close();
  }
};

// connect to database
 main();
