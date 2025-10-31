const userModel = require("../models/user.model");
const postModel = require("../models/post.model")
const { getBucket } = require("../lib/gridfs");
const mongoose = require('mongoose');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');

module.exports.registor = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        username,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });


}

module.exports.login = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user });
}

module.exports.profile = async (req, res, next) => {

    res.status(200).json(req.user);

}

module.exports.logout = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out' });

}

//add new post
exports.userposts = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(401).send("Unauthorized");

 const user = await userModel.findById(userId).populate("posts")
  
      console.log(user);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    res.status(500).send("Server error");
  }
};


//profile
// exports.profile = async (req, res) => {
//   const user = await userModel.findOne({
//     username: req.session.passport.user,
//   })
//   .populate("posts");
//   let count=0;
//   let postArr = [[],[],[],[]];
//   user.posts.forEach( function(post){
//     if(count%4 == 0){
//       postArr[0].push(post);
//     }
//     else if(count%4 == 1){
//       postArr[1].push(post);
//     }
//     else if(count%4 == 2){
//       postArr[2].push(post);
//     }
//     else if(count%4 == 3){
//       postArr[3].push(post);
//     }
//     count++;
//   })
//   console.log(postArr);
//   res.render("profile", {user: user});
// };

exports.addpost= (req,res, next) =>{
  res.render("addpost");
}
// getting image file from gridfs
exports.getFile = async (req, res) => {
  try {
    const bucket = getBucket();
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(res);

    downloadStream.on('error', () => res.status(404).send('File not found'));
  } catch (err) {
    res.status(400).send('Invalid file ID');
  }
};

//home
exports.home = async(req,res)=> {
  const user = await userModel.findOne({username: req.session.passport.user});
  const posts = await postModel.find()
  .populate("user");
  res.render('home', {user, posts});
}



