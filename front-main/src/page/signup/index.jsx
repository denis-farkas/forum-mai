import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./signup.css" ;
import { toast } from "react-toastify";


const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("member");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!firstname.trim()) {
      errors.firstname = "Veuillez entrer votre prénom .";
    }

    if (!lastname.trim()) {
      errors.lastname = "Veuillez entrer votre nom.";
    }
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
       firstname,
       lastname,
        email,
        password,
        city,
        role
      }

      data = JSON.stringify(data);
    console.log(data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/users/signUp",
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
        setFirstname("");
        setLastname("");
        setCity("");
        setEmail("");
        setPassword("");
        toast.success("Inscription validée");
        setTimeout(() => {
          navigate("/signIn");
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
      <h1>S&apos;inscrire</h1>
      <form className="formulaire" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Prénom"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className={errors.firstname ? "error" : ""}
          />{" "}
        </div>
        {errors.firstname && <p className="error-message">{errors.firstname}</p>}

        <div className="form-group">
          <input
            type="text"
            placeholder="Nom"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className={errors.lastname ? "error" : ""}
          />{" "}
        </div>
        {errors.lastname && <p className="error-message">{errors.lastname}</p>}

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "error" : ""}
          />
        </div>
        {errors.email && <p className="error-message">{errors.email}</p>}

        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "error" : ""}
          />
        </div>
        {errors.password && <p className="error-message">{errors.password}</p>}

        <div className="form-group">
          <input
            type="text"
            placeholder="ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={errors.city ? "error" : ""}
          />{" "}
        </div>
        {errors.city && <p className="error-message">{errors.city}</p>}

        <h6>
          En m&apos;inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Forum. Je confirme
          avoir au moins 18 ans.
        </h6>

        <button className="btn-to-login" type="submit">
          S&apos;inscrire
        </button>
      </form>
      <p className="inscrire">
        <Link to="/signin">Tu as déjà un compte ? Connecte-toi !</Link>
      </p>
    </div>
  );
};

export default Signup;