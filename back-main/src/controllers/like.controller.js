import { LikeDB } from "../databases/like.database.js";

const createLikePost = async (req, res) => {
  const { liked, disliked, id_post, id_user } = req.body;

  const response = await LikeDB.createLikePost(
    liked,
    disliked,
    id_post,
    id_user
  );

  const responseError = response.error;
  console.log(response);
  if (responseError) {
    return res.status(500).json({ message: responseError });
  }

  return res.status(200).json({ message: "Like ajouté" });
};

const createDisLikePost = async (req, res) => {
  const { liked, disliked, id_post, id_user } = req.body;

  const response = await LikeDB.createDisLikePost(
    liked,
    disliked,
    id_post,
    id_user
  );

  const responseError = response.error;
  console.log(response);
  if (responseError) {
    return res.status(500).json({ message: responseError });
  }

  return res.status(200).json({ message: "Dislike ajouté" });
};

const totalLikePost = async (req, res) => {
  const id_post = req.query.id_post;
  console.log(id_post);
  const response = await LikeDB.totalLikePost(id_post);
  const result = response.result;
  console.log(result);
  const total = result[0].total;
  return res.status(200).json({ message: "Requête OK", total: total });
};

const createLikeComment = async (req, res) => {
  const { liked, disliked, id_comment, id_user } = req.body;

  const response = await LikeDB.createLikeComment(
    liked,
    disliked,
    id_comment,
    id_user
  );

  const responseError = response.error;
  console.log(response);
  if (responseError) {
    return res.status(500).json({ message: responseError });
  }

  const total = await LikeDB.totalLikeComment(id_comment);

  return res.status(200).json({ message: "Like ajouté", total: total });
};

// Fonction pour afficher les likes
const readLikeByUser = async (req, res) => {
  const response = await LikeDB.readLikeByUser(req.query.id_user);
  console.log(response);
  //const result = response.result;

  //const likes = {
  //    liked: result[0].liked,
  //
  //};
  return res.status(200).json({ message: "Requête OK", response });
};

const readLikeByUserByPost = async (req, res) => {
  const { id_user, id_post } = req.body;
  const response = await LikeDB.readLikeByUserByPost(id_user, id_post);
  // Récupération d'une éventuelle erreur
  const error = response.error; // soit une chaîne de caractères, soit null

  // Vérification de la présence d'une erreur
  if (error) {
    // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
    return res.status(500).json({ message: error });
  } else if (response.result.id && response.result.liked == 0) {
    // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un message indiquant la suppression réussie
    return res.status(403).json({ message: "dislike exist" });
  } else if (response.result.id && response.result.liked == 1) {
    // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un message indiquant la suppression réussie
    return res.status(403).json({ message: "like exist" });
  } else {
    return res.status(200).json({ message: "ok" });
  }
};

const deleteLikePost = async (req, res) => {
  const { id_user, id_post } = req.body;
  const response = await LikeDB.deleteLikePost(id_user, id_post);
  // Récupération d'une éventuelle erreur
  const error = response.error; // soit une chaîne de caractères, soit null

  // Vérification de la présence d'une erreur
  if (error) {
    // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
    return res.status(500).json({ message: error });
  } else {
    // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un message indiquant la suppression réussie
    return res.status(200).json({ message: "like supprimé" });
  }
};

export const LikeController = {
  createLikePost,
  createDisLikePost,
  readLikeByUser,
  createLikeComment,
  readLikeByUserByPost,
  totalLikePost,
  deleteLikePost,
};
