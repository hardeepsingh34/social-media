// lib/gridfs.js
const mongoose = require('mongoose');
let bucket;

function initGridFS() {
  if (!mongoose.connection.db) {
    throw new Error('Mongo connection not established yet.');
  }
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads',
  });
  console.log('✅ GridFS bucket initialized');
  return bucket;
}

function getBucket() {
  if (!bucket) {
    console.warn('⚠️ GridFS bucket not initialized — initializing now...');
    return initGridFS();
  }
  return bucket;
}

module.exports = { initGridFS, getBucket };
