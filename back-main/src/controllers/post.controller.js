import { PostDB } from "../databases/post.database.js";

const createPost = async (req,res) => {
    const {
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
    } = req.body

const response = await PostDB.createPost(
    title,
    content,
    creation,
    id_user,
    id_topic,
    liked,
    disliked,
    open,
    published,
    image,)


    const responseError = response.error;
    console.log(response);
    if (responseError) {
      return res.status(500).json({ message: responseError });
    }

    const postId = response.result.insertId;
    return res.status(200).json({ message: "post créé", post: postId });
}

// Fonction pour lire les informations de tous les utilisateurs
const readPost = async (req, res) => {
    const response = await PostDB.readPost();
    const result = response.result;
  
    return res.status(200).json({ message: "Request OK", posts: result });
  };

  // Fonction pour lire les informations de tous les utilisateurs
const readPostByTopic= async (req, res) => {
  const response = await PostDB.readPostByTopic(req.query.id);
  const result = response.result;

  return res.status(200).json({ message: "Request OK", posts: result });
};

  // Fonction pour afficher les informations personnelles d'un utilisateur
  const readOnePost = async (req, res) => {
    const response = await PostDB.readOnePost(req.query.id);
    console.log(response);
    const result = response.result;
  
    const post = {
        title: result[0].title,
        content: result[0].content,
        creation: result[0].creation,
        id_user: result[0].id_user,
        id_topic: result[0].id_topic,
        liked: result[0].liked,
        disliked: result[0].disliked,
        open: result[0].open,
        published: result[0].published,
        image: result[0].image,
      
    };
  
    return res.status(200).json({ message: "Requête OK", post });
  };

  const updatePost = async(req, res) =>{
    const {post} = req.body

    const {
        id,
        title,
        content,
        id_topic,
        published,
        image
    } = post

    const response = await PostDB.updatePost(
        id,
        title,
        content,
        id_topic,
        published,
        image)

    const responseError = response.error;
    console.log(response);

    if (responseError) {
      return res.status(500).json({ message: responseError });
    }
    return res.status(200).json({ message: "Post modifié"});
  }

  const publishPost = async(req, res) => {
    const{post} = req.body
    const{id} = post
    const response = await PostDB.publishPost(id)
    const responseError = response.error;
    console.log(response);

    if (responseError) {
      return res.status(500).json({ message: responseError });
    }
    return res.status(200).json({ message: "Post publié"});
  }
  
  const privatePost = async(req, res) => {
    const{post} = req.body
    const{id} = post
    const response = await PostDB.privatePost(id)
    const responseError = response.error;
    console.log(response);

    if (responseError) {
      return res.status(500).json({ message: responseError });
    }
    return res.status(200).json({ message: "Post rendu privé"});
  }

  const closePost = async(req, res) => {
    const{post} = req.body
    const{id} = post
    const response = await PostDB.closePost(id)
    const responseError = response.error;
    console.log(response);

    if (responseError) {
      return res.status(500).json({ message: responseError });
    }
    return res.status(200).json({ message: "Post fermé"});
  }

  export const PostController = {
    createPost, 
    readOnePost, 
    readPost, 
    readPostByTopic,
    updatePost,
    publishPost,
    privatePost,
    closePost
  }