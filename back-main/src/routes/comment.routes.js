import { CommentController } from "../controllers/comment.controller.js";

import express from "express";

const initCommentRoutes = (app) => {
  const router = express.Router();
  router.post("/createComment", CommentController.createComment);
  router.get("/readComment", CommentController.readComment);
  router.get("/readOneComment", CommentController.readOneComment);
  router.put("/updateComment", CommentController.updateComment);
  router.put("/publishComment", CommentController.publishComment);
  router.put("/signalComment", CommentController.signalComment);
  router.get("/totalComment", CommentController.totalComment);
  app.use("/api/comment", router);
};

export default initCommentRoutes;