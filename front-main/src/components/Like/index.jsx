import { useState, useEffect } from "react";
import { AiTwotoneLike } from "react-icons/ai";
import { AiTwotoneDislike } from "react-icons/ai";
import axios from "axios";
import "./like.css";

const Like = (props) => {
  const id_user = props.id_user;
  const id_post = props.id_post;
  const [liked, setLiked] = useState(false);
  const [disliked, setDisLiked] = useState(false);
  const [totalLike, setTotalLike] = useState();

  const getTotalLike = (id_post) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/like/totalLikePost?id_post=${id_post}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response);
        setTotalLike(response.data.total);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickLike = () => {
    if (liked === false && disliked === false) {
      setLiked(true);
      addLike(id_user, id_post).then(() => getTotalLike(id_post));
    } else if (liked === false && disliked === true) {
      deleteLike(id_user, id_post);
      setDisLiked(false);
      setLiked(true);
      addLike(id_user, id_post).then(() => getTotalLike(id_post));
    }
  };

  const handleClickDisLike = () => {
    if (liked === false && disliked === false) {
      setDisLiked(true);
      addDisLike(id_user, id_post).then(() => getTotalLike(id_post));
    } else if (liked === true && disliked === false) {
      deleteLike(id_user, id_post);
      setLiked(false);
      setDisLiked(true);
      addDisLike(id_user, id_post).then(() => getTotalLike(id_post));
    }
  };

  const deleteLike = (id_user, id_post) => {
    let data = {
      id_user,
      id_post,
    };

    data = JSON.stringify(data);
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/like/deleteLikePost",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios.request(config).then((response) => {
      if (response.status === 200) {
        console.log("like deleted");
      }
    });
  };

  const addLike = async (id_user, id_post) => {
    const liked = 1;
    const disliked = 0;

    let data = {
      id_user,
      id_post,
      liked,
      disliked,
    };

    data = JSON.stringify(data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/like/createLikePost",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      if (response.status === 200) {
        console.log("like added");
      }
    } catch (error) {
      console.error("Error adding like:", error);
      throw error; // Re-throw the error to be caught by the caller, if necessary
    }
  };

  const addDisLike = async (id_user, id_post) => {
    const liked = 0;
    const disliked = 1;

    let data = {
      id_user,
      id_post,
      liked,
      disliked,
    };
    data = JSON.stringify(data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/like/createDisLikePost",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      const response = await axios.request(config);
      if (response.status === 200) {
        console.log("dislike added");
      }
    } catch (error) {
      console.error("Error adding like:", error);
      throw error; // Re-throw the error to be caught by the caller, if necessary
    }
  };

  const getLikeByUserByPost = (id_user, id_post) => {
    let data = {
      id_user,
      id_post,
    };

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/like/readLikeByUserByPost`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.status === 403 && response.message == "dislike exist") {
          setDisLiked(true);
        } else if (
          response.status === 403 &&
          response.message == "like exist"
        ) {
          setLiked(true);
        } else {
          console.log("like  not used");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTotalLike(id_post);
    getLikeByUserByPost(id_user, id_post);
  }, []);

  return (
    <div className="like">
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleClickLike}
      >
        {liked ? (
          <AiTwotoneLike style={{ color: "red" }} />
        ) : (
          <AiTwotoneLike style={{ color: "black" }} />
        )}
      </button>
      <p className="total">{totalLike}</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleClickDisLike}
      >
        {disliked ? (
          <AiTwotoneDislike style={{ color: "red" }} />
        ) : (
          <AiTwotoneDislike style={{ color: "black" }} />
        )}
      </button>
    </div>
  );
};

export default Like;
