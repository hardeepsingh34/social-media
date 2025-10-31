// middleware/upload.js
const multer = require('multer');
const { getBucket } = require('../lib/gridfs');
const { Readable } = require('stream');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const upload = multer({ storage: multer.memoryStorage() });

async function saveToGridFS(file) {
  return new Promise((resolve, reject) => {
    const bucket = getBucket();
    const filename = uuidv4() + path.extname(file.originalname);
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: file.mimetype,
    });

    const readStream = Readable.from(file.buffer);
    readStream.pipe(uploadStream);

    uploadStream.on('finish', () => resolve(uploadStream.id.toString()));
    uploadStream.on('error', reject);
  });
}

module.exports = { upload, saveToGridFS };
