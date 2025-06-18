import express from "express";
const router = express.Router();
import auth from "../middleware/authMiddleware.js";

import {
  getPosts,
  createPost,
  deletePost,
} from "../controllers/postController.js";

router.get("/posts", auth, getPosts);
router.post("/posts", auth, createPost);
router.delete("/posts/:id", auth, deletePost);

export default router;
