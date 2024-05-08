import { LikeController } from "../controllers/like.controller.js";

import express from "express";

const initLikeRoutes = (app) => {
  const router = express.Router();
  router.post("/createLikePost", LikeController.createLikePost);
  router.post("/createDisLikePost", LikeController.createDisLikePost);
  router.post("/createLikeComment", LikeController.createLikeComment);
  router.get("/readLikeByUser", LikeController.readLikeByUser);
  router.get("/readLikeByUserByPost", LikeController.readLikeByUserByPost);
  router.get("/totalLikePost", LikeController.totalLikePost);
  router.delete("/deleteLikePost", LikeController.deleteLikePost);

  app.use("/api/like", router);
};

export default initLikeRoutes;
