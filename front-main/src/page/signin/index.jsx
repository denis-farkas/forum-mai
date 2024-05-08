import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../signup/signup.css";
import { toast } from "react-toastify";
import { userService } from "../../utils/userService";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim()) {
      errors.email = "Veuillez entrer un email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Veuillez entrer un email valide.";
    }

    if (!password.trim()) {
      errors.password = "Veuillez entrer un mot de passe.";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      let data = {
        email,
        password,
      };

      data = JSON.stringify(data);
      console.log(data);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/users/signIn",
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
            userService.login(response.data.user);
            setEmail("");
            setPassword("");
            toast.success("Connecté");
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
    <div className="login-container">
      <h1>Se connecter</h1>
      <form className="formulaire" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            placeholder="Adresse email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
        </div>
        <div className="form-group">
          <input
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {Object.keys(errors).length > 0 && (
          <div className="error">
            {Object.values(errors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <div className="form-group">
          <button className="btn-to-login" type="submit">
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin