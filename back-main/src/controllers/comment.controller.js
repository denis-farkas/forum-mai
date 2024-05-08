import { CommentDB } from "../databases/comment.database.js";

const createComment = async (req, res) => {
  const {
    content,
    publication,
    id_user,
    id_post,
    liked,
    disliked,
    visible,
    signaled,
  } = req.body;

  const response = await CommentDB.createComment(
    content,
    publication,
    id_user,
    id_post,
    liked,
    disliked,
    visible,
    signaled
  );

  const responseError = response.error;
  console.log(response);
  if (responseError) {
    return res.status(500).json({ message: responseError });
  }

  const commentId = response.result.insertId;
  return res.status(200).json({ message: "comment créé", comment: commentId });
};

// Fonction pour lire les informations de tous les utilisateurs
const readComment = async (req, res) => {
  const response = await CommentDB.readComment(req.query.id);
  const result = response.result;

  return res.status(200).json({ message: "Request OK", comments: result });
};

// Fonction pour afficher les informations personnelles d'un utilisateur
const readOneComment = async (req, res) => {
  const response = await CommentDB.readOneComment(req.query.id);
  console.log(response);
  const result = response.result;

  const post = {
    content: result[0].content,
    publication: result[0].publication,
    id_user: result[0].id_user,
    id_post: result[0].id_post,
    liked: result[0].liked,
    disliked: result[0].disliked,
    visible: result[0].visible,
    signaled: result[0].signaled,
  };

  return res.status(200).json({ message: "Requête OK", comment });
};

const updateComment = async (req, res) => {
  const { comment } = req.body;

  const { content, visible, signaled } = comment;
  const response = await CommentDB.updateComment(content, visible, signaled);

  const responseError = response.error;
  console.log(response);

  if (responseError) {
    return res.status(500).json({ message: responseError });
  }
  return res.status(200).json({ message: "commentaire modifié" });
};

const publishComment = async (req, res) => {
  const { comment } = req.body;
  const { id, visible } = comment;
  const response = await CommentDB.publishComment(id, visible);
  const responseError = response.error;
  console.log(response);

  if (responseError) {
    return res.status(500).json({ message: responseError });
  }
  return res.status(200).json({ message: "commentaire publié" });
};

const signalComment = async (req, res) => {
  const { comment } = req.body;
  const { id } = comment;
  const response = await CommentDB.signalComment(id);
  const responseError = response.error;
  console.log(response);

  if (responseError) {
    return res.status(500).json({ message: responseError });
  }
  return res.status(200).json({ message: "commentaire signalé" });
};

const totalComment = async (req, res) => {
  const id_post = req.query.id_post;
  console.log(id_post)
  const response = await CommentDB.totalComment(id_post);
  const result = response.result;
  console.log(response)
  const total = result[0].total
  return res.status(200).json({ message: "Requête OK", total : total });
}

export const CommentController = {
  createComment,
  readOneComment,
  readComment,
  updateComment,
  publishComment,
  signalComment,
  totalComment
};
