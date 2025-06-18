import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  const posts = await Post.find({ author: req.user._id }).sort("-createdAt");
  res.json(posts);
};

export const createPost = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const post = await Post.create({
      title,
      content,
      author: req.user._id, // renamed field
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const deletePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id, user: req.user._id });
  if (!post) return res.status(404).json({ message: "Post not found" });

  await post.remove();
  res.json({ message: "Post deleted" });
};

export const editPost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id, user: req.user._id });
  if (!post) return res.status(404).json({ message: "Post not found" });

  await post.remove();
  res.json({ message: "Post deleted" });
};
