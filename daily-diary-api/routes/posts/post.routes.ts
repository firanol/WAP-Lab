import express, { json } from "express";
import {
    addPostHandler,
    getAllPostsHandler,
    getPostByIdHandler,
    votePostHandler,
} from "../../controllers/posts/posts.controller";

const router = express.Router();

router.post("/", json(), addPostHandler);
router.get("/", getAllPostsHandler);
router.get("/:id", getPostByIdHandler);
router.patch("/:id", json(), votePostHandler);

export default router;
