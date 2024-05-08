import query from "./init.database.js";

const createTopic = async(
    title,
      description,
      image) => {
   const sql = `
   INSERT INTO topic (
   title,
   description,
   image)
   VALUES (?,?,?)
`;

let error = null;
let result = null;

try {
   result = await query(sql, [
    title,
    description,
   image]);
} catch (e) {
   error = e.message;
} finally {
   return { error, result };
}
};

const readTopic = async () => {
    const sql = `
        SELECT *
        FROM topic
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

const readOneTopic = async (id) => {
    const sql = `
        SELECT *
        FROM  topic
        WHERE id = ?
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql,[id] );
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};

const updateTopic = async (
    id,
    title,
    description,
    image) => {
    const sql = `

        UPDATE topic
        SET title = ?, description = ?,image = ?
        WHERE id = ?
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [  
        title,
       description,
        image,
        id
        ]);
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};

export const TopicDB = {
    createTopic, 
    readOneTopic, 
    readTopic, 
    updateTopic,
}
