const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectToDb = require("./db/db")
const cookieParser = require('cookie-parser');
const cors = require("cors"); 
const UserRoutes = require("./routes/user.routes");
const PostRoutes = require("./routes/post.routes")
const settingsRoutes = require("./routes/setting.routes");
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send("home page");
});
app.use('/user', UserRoutes);
app.use("/post", PostRoutes);
app.use("/settings", settingsRoutes);

module.exports = app;