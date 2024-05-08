// Import du module pour exécuter les requêtes SQL
import query from "./init.database.js";
const createPost = async (
  title,
  content,
  creation,
  id_user,
  id_topic,
  liked,
  disliked,
  open,
  published,
  image
) => {
  const sql = `
        INSERT INTO post (
        title,
        content,
        creation,
        id_user,
        id_topic,
        liked,
        disliked,
        open,
        published,
        image)
        VALUES (?,?,? ,? ,? ,? ,?,? ,? ,?)
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [
      title,
      content,
      creation,
      id_user,
      id_topic,
      liked,
      disliked,
      open,
      published,
      image,
    ]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

const readOnePost = async (id) => {
  const sql = `
        SELECT *
        FROM post
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

const readPost = async () => {
  const sql = `
        SELECT *
        FROM post
        ORDER BY id DESC
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

const readPostByTopic = async (id) => {
  const sql = `
        SELECT *
        FROM post
        WHERE id_topic = ?
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
const updatePost = async (id, title, content, id_topic, published, image) => {
  const sql = `

        UPDATE post
        SET title = ?, content = ?, id_topic = ?, published = ?,image = ?
        WHERE id = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [title, content, id_topic, published, image, id]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};
const publishPost = async (id) => {
  const sql = `
        UPDATE post
        SET  published = 1
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
const privatePost = async (id) => {
  const sql = `
        UPDATE post
        SET  published = 0
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
const closePost = async (id) => {
  const sql = `
        UPDATE post
        SET  open = 0
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
export const PostDB = {
  createPost,
  readOnePost,
  readPost,
  readPostByTopic,
  updatePost,
  publishPost,
  privatePost,
  closePost,
};
