import { TopicController } from "../controllers/topic.controller.js";

import express from "express";

const initTopicRoutes = (app) => {
  const router = express.Router();
  router.post("/createTopic", TopicController.createTopic);
  router.get("/readTopic", TopicController.readTopic);
  router.get("/readOneTopic", TopicController.readOneTopic);
  router.put("/updateTopic", TopicController.updateTopic);

  app.use("/api/topic", router);
};

export default initTopicRoutes;