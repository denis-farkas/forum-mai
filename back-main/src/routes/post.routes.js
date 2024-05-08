import { PostController } from "../controllers/post.controller.js";

import express from "express";

const initPostRoutes = (app) => {
  const router = express.Router();
  router.post("/createPost", PostController.createPost);
  router.get("/readPost", PostController.readPost);
  router.get("/readOnePost", PostController.readOnePost);
  router.put("/updatePost", PostController.updatePost);
  router.put("/publishPost", PostController.publishPost);
  router.put("/privatePost", PostController.privatePost);
  router.put("/closePost", PostController.closePost);

  app.use("/api/post", router);
};

export default initPostRoutes;