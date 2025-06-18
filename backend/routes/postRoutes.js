import express from "express";
const router = express.Router();
import auth from "../middleware/authMiddleware.js";

import {
  getPosts,
  createPost,
  deletePost,
  editPost,
} from "../controllers/postController.js";

router.get("/posts", auth, getPosts);
router.post("/posts", auth, createPost);
router.delete("/posts/:id", auth, deletePost);
router.put("/edit-post/:id", auth, editPost);

export default router;
