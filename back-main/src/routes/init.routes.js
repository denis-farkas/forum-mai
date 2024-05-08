import initCommentRoutes from "./comment.routes.js";
import initLikeRoutes from "./like.routes.js";
import initPostRoutes from "./post.routes.js";
import initTopicRoutes from "./topic.routes.js";
import initUserRoutes from "./user.routes.js";

// Fonction pour initialiser toutes les routes de l'application Express
const initRoutes = (app) => {
    // Appel des fonctions d'initialisation des routes pour chaque domaine
    initUserRoutes(app);
    initPostRoutes(app);
    initCommentRoutes(app);
    initTopicRoutes(app);
    initLikeRoutes(app)
};

export default initRoutes;