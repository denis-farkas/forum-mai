import query from "../databases/init.database.js";

// Middleware pour vérifier le statut d'administrateur de l'utilisateur
const checkConnected = async (req, res, next) => {
  // Récupération de l'identifiant de l'utilisateur depuis la requête
  const userId = req.body.userId;

  // Requête SQL pour obtenir le rôle de l'utilisateur
  const userSql = `
    SELECT id, role, status
    FROM users
    WHERE id = ?
  `;

  // Exécution de la requête SQL
  const userRes = await query(userSql, [userId]);
  const user = userRes[0];
  const status = user.status;

  // Vérification si l'utilisateur a le rôle d'administrateur
  if (status !== "1") {
    return res
      .status(403)
      .json({ message: `Il n'est pas connecté.` });
  }

  // Poursuite de l'exécution de la requête suivante (middleware suivant)
  next();
};

export default checkConnected;
