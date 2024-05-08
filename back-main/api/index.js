import express from "express";
import initRoutes from "../src/routes/init.routes.js";
import initMiddlewares from "../src/middlewares/init.middleware.js";

// Création de l'application Express
const app = express();

// Initialisation des middlewares (gestionnaires intermédiaires)
initMiddlewares(app);

// Initialisation des routes de l'application
initRoutes(app);

// Écoute du serveur sur le port spécifié
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;