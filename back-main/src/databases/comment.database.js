// Import du module pour exécuter les requêtes SQL
import query from "./init.database.js";
const createComment = async (
  content,
  publication,
  id_user,
  id_post,
  liked,
  disliked,
  visible,
  signaled
) => {
  const sql = `
        INSERT INTO comment (
            content,
            publication,
            id_user,
            id_post,
            liked,
            disliked,
            visible,
            signaled)
        VALUES (?,?,? ,? ,? ,? ,?,? )
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [
      content,
      publication,
      id_user,
      id_post,
      liked,
      disliked,
      visible,
      signaled,
    ]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

const readOneComment = async (id) => {
  const sql = `
        SELECT *
        FROM comment
        WHERE id = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

const readComment = async (id) => {
  const sql = `
        SELECT *
        FROM comment
        WHERE id_post = ?
        ORDER BY id DESC
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

const updateComment = async (id, content, visible, signaled) => {
  const sql = `

        UPDATE comment
        SET content = ?, visible = ?, signaled = ?
        WHERE id = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [content, visible, signaled, id]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};
const publishComment = async (visible, id) => {
  const sql = `
        UPDATE comment
        SET  visible = ?
        WHERE id = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [visible, id]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};
const signalComment = async (id) => {
  const sql = `
        UPDATE comment
        SET  signaled = 1
        WHERE id = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

const totalComment = async (id_post) => {

  const sql =  `
  SELECT COUNT(id) AS total
  FROM comment
  WHERE id_post = ?
`;


  let error = null;
  let result = null;

  try {
      result = await query(sql,[id_post] );
  } catch (e) {
      error = e.message;
  } finally {
      return { error, result };
  }
};

export const CommentDB = {
  createComment,
  readOneComment,
  readComment,
  updateComment,
  publishComment,
  signalComment,
  totalComment
};
