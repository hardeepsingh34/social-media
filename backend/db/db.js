// db/connect.js
const mongoose = require('mongoose');
const { initGridFS } = require('../lib/gridfs');

async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log('✅ MongoDB connected');

    mongoose.connection.once('open', () => {
      initGridFS();
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = connectToDb;
