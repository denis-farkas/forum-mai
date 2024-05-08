import query from "./init.database.js";

const createLikePost = async (liked, disliked, id_post, id_user) => {
  const sql = `
   INSERT INTO liked_post (
    liked,
      disliked,
      id_post,
      id_user)
   VALUES (?,?,?, ? )
`;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [liked, disliked, id_post, id_user]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

const createDisLikePost = async (liked, disliked, id_post, id_user) => {
  const sql = `
 INSERT INTO liked_post (
  liked,
    disliked,
    id_post,
    id_user)
 VALUES (?,?,?, ? )
`;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [liked, disliked, id_post, id_user]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

const createLikeComment = async (liked, disliked, id_comment, id_user) => {
  const sql = `
   INSERT INTO liked_comment (
    liked,
      disliked,
      id_comment,
      id_user)
   VALUES (?,?,?, ? )
`;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [liked, disliked, id_comment, id_user]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

const totalLikePost = async (id_post) => {
  const sql = `
    SELECT COUNT(liked) AS total
    FROM liked_post
    WHERE id_post = ? 
`;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_post]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

const totalLikeComment = async (id_comment) => {
  const sql = `
    SELECT COUNT(liked)
    FROM liked_comment
    WHERE id_comment = ?
`;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_comment]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

const readLikeByUser = async (id_user) => {
  const sql = `
    SELECT 
    (SELECT COUNT(*) FROM  liked_post WHERE id_user = ? ) AS post_count,
    (SELECT COUNT(*) FROM liked_comment WHERE id_user = ? ) AS comment_count;
`;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_user, id_user]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

const readLikeByUserByPost = async (id_user, id_post) => {
  const sql = `
    SELECT 
    id, liked, disliked FROM  liked_post WHERE id_user = ? && id_post = ? && liked = 1
`;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_user, id_post]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

const deleteLikePost = async (id_user, id_post) => {
  const sql = `
        DELETE FROM liked_post
        WHERE id_user = ? && id_post = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_user, id_post]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

export const LikeDB = {
  createLikePost,
  createDisLikePost,
  readLikeByUser,
  totalLikeComment,
  totalLikePost,
  createLikeComment,
  readLikeByUserByPost,
  deleteLikePost,
};
