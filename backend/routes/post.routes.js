// routes/post.routes.js
const express = require('express');
const router = express.Router();
const { upload, saveToGridFS } = require('../middleware/upload');
const postModel = require('../models/post.model');
const authMiddleware = require("../middleware/auth.middleware")
const post = require("../controller/post.controller")

router.post('/upload',authMiddleware.authUser, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No file uploaded');

    const user = req.user;
    console.log(user);
    if (!user) return res.status(401).send('User not found');

    const fileId = await saveToGridFS(req.file);

    const post = await postModel.create({
      imageId: fileId,
      imageText: req.body.filecaption,
      user: user._id,
      description: req.body.description,
    });

    user.posts.push(post._id);
    await user.save();

    console.log('✅ File uploaded & post saved:', post._id);
     return res.status(201).json({
      message: 'Post uploaded successfully',
      post,
    });
  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).send('File upload failed');
  }
});

router.get('/createpost', post.createPost);
router.get('/alluserposts', post.allUserPosts);


module.exports = router;