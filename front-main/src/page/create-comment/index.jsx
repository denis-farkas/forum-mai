import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../signup/signup.css";
import { toast } from "react-toastify";

const CreateComment = () => {
  const { id_post } = useParams();
  console.log(id_post);
  const [content, setContent] = useState("");

  const [errors, setErrors] = useState({});

  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const id_user = user.userId;
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!content.trim()) {
      errors.content = "Veuillez entrer un contenu.";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let publication = new Date();
    publication = publication.toISOString().slice(0, 19).replace("T", " ");
    if (validateForm()) {
      const liked = null;
      const disliked = null;
      const visible = 1;
      const signaled = 0;

      let data = {
        content,
        publication,
        id_user,
        id_post,
        liked,
        disliked,
        visible,
        signaled,
      };

      data = JSON.stringify(data);
      console.log(data);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/comment/createComment",
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
            setContent("");
            toast.success("Commentaire créé");
            setTimeout(() => {
              navigate(`/post/${id_post}`);
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
      <h1>Créer commentaire</h1>
      <form className="formulaire" onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            aria-label="Contenu du commentaire"
            className="inputTextarea"
            type="text"
            name="content"
            placeholder="Contenu du commentaire"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            required="required"
          />
        </div>
        {errors.content && <p className="error-message">{errors.content}</p>}

        <button className="btn-to-login" type="submit">
          Créer le commentaire
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
