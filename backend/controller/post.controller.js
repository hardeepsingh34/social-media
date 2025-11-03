const postModel = require('../models/post.model');
const userModel = require('../models/user.model');

exports.createPost = async (req,res,next)=>{
let createdpost = await postModel.create({
  postText:'hii this is hardeepkmn',
  user:'6889be61da922f68d22f2f72',
})
let user = await userModel.findById({_id:'6889be61da922f68d22f2f72'})

console.log(user.posts);
user.posts.push(createdpost._id);
await user.save();

res.send('done');

}

exports.allUserPosts = async (req, res, next) => {
  try {
    const posts = await postModel
      .find()                     // ✅ fetch all posts
      .populate('user');          // ✅ populate user field
     console.log("these are posts ", posts);
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
