import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  const posts = await Post.find({ user: req.user._id }).sort("-createdAt");
  res.json(posts);
};

export const createPost = async (req, res) => {
  const { content } = req.body;
  const post = await Post.create({ content, user: req.user._id });
  res.status(201).json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id, user: req.user._id });
  if (!post) return res.status(404).json({ message: "Post not found" });

  await post.remove();
  res.json({ message: "Post deleted" });
};
