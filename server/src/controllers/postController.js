import Post from "../model/postModel.js";
import User from "../model/userModel.js";

export const createPost = async (req, res) => {
  try {
    const { description } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    const newPost = new Post({
      userId,
      description: description.trim(),
    });

    await newPost.save();

    const userPosts = await Post.find({ userId });

    res.status(201).json({
      success: true,
      message: "Post uploaded",
      userPosts,
    });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const userId = req.userId;
    const post = await Post.find({ userId });

    res.status(200).json({
      success: true,
      message: "post fetched",
      post,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
