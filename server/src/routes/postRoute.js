import express from "express";
import userAuth from "../middleware/userAuth.js";
import { createPost, getPost } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.post("/create-post", userAuth, createPost);
postRouter.get("/get-post", userAuth, getPost);

export default postRouter;
