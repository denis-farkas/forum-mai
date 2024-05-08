import { TopicDB } from "../databases/topic.database.js";

const createTopic = async (req,res) => {
    const {
      title,
      description,
      image
    } = req.body

const response = await TopicDB.createTopic(
    title,
    description,
    image)


    const responseError = response.error;
    console.log(response);
    if (responseError) {
      return res.status(500).json({ message: responseError });
    }

    const topicId = response.result.insertId;
    return res.status(200).json({ message: "Topic créé", topic: topicId });
}

// Fonction pour lire les informations de tous les utilisateurs
const readTopic = async (req, res) => {
    const response = await TopicDB.readTopic();
    const result = response.result;
  
    return res.status(200).json({ message: "Request OK", topics: result });
  };
  
  // Fonction pour afficher les informations personnelles d'un utilisateur
  const readOneTopic = async (req, res) => {
    const response = await TopicDB.readOneTopic(req.query.id);
    console.log(response);
    const result = response.result;
  
    const topic = {
        title: result[0].title,
        description: result[0].description,
        image: result[0].image,
      
    };
  
    return res.status(200).json({ message: "Requête OK", topic });
  };

  const updateTopic = async(req, res) =>{
    const {topic} = req.body

    const {
        title,
        description,
        image
    } = topic
    const response = await TopicDB.updateTopic(
        title,
        description,
        image)

    const responseError = response.error;
    console.log(response);

    if (responseError) {
      return res.status(500).json({ message: responseError });
    }
    return res.status(200).json({ message: "topic modifié"});
  }

  export const TopicController = {
    createTopic, 
    readOneTopic, 
    readTopic, 
    updateTopic,
  }