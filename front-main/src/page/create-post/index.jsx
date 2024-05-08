import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../signup/signup.css";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState();
  const [id_topic, setTopic] = useState();

  const [errors, setErrors] = useState({});

  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const id_user = user.userId;
  const navigate = useNavigate();

  useEffect(() => {
    let data;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/topic/readTopic",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setTopics(response.data.topics);
        //console.log(listCategory);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!title.trim()) {
      errors.title = "Veuillez entrer un titre .";
    }

    if (!content.trim()) {
      errors.content = "Veuillez entrer un contenu.";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let creation = new Date();
    creation = creation.toISOString().slice(0, 19).replace("T", " ");
    if (validateForm()) {
      let data = {
        title,
        content,
        creation,
        id_user,
        id_topic,
      };

      data = JSON.stringify(data);
      console.log(data);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/post/createPost",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log("Response succeeded!");
            setTitle("");
            setContent("");
            setTopic("");
            toast.success("Post créé");
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message || "An error occurred";
          toast.error(errorMessage);
        });
    }
  };

  return (
    <div className="signup-container">
      <h1>Créer post</h1>
      <form className="formulaire" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? "error" : ""}
          />{" "}
        </div>
        {errors.title && <p className="error-message">{errors.title}</p>}

        <div className="form-group">
          <textarea
            aria-label="Description du post"
            className="inputTextarea"
            type="text"
            name="content"
            placeholder="Contenu du post"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            required="required"
          />
        </div>
        {errors.content && <p className="error-message">{errors.content}</p>}
        <label className="inputLabel" htmlFor="topicSelect">
          Sélectionner une catégorie{" "}
        </label>
        <select
          aria-label="Sélectionner une catégorie "
          className="inputSelect"
          id="topicSelect"
          onChange={(e) => {
            setTopic(e.target.value);
          }}
        >
          {topics && topics.length > 0 ? (
            <>
              {" "}
              <option value="0">Sélectionner une catégorie</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.title}>
                  {topic.title}
                </option>
              ))}
            </>
          ) : (
            <option value="">Aucun topic disponible</option>
          )}
        </select>

        <button className="btn-to-login" type="submit">
          Créer le post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;