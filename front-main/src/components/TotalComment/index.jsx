import { useState, useEffect } from "react";
import "./totalComment.css";
import { FaRegCommentAlt } from "react-icons/fa";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TotalComment = ({ id_post }) => {
  const [totalComment, setTotalComment] = useState();

  const getTotalComment = (id_post) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/comment/totalComment?id_post=${id_post}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response);
        setTotalComment(response.data.total);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTotalComment(id_post);
  }, []);

  return (
    <div className="card-footer-comment">
      <Link to={`/post/${id_post}`}>
        <button type="button" className="btn btn-primary">
          <FaRegCommentAlt />
        </button>
      </Link>
      <p className="badge">{totalComment}</p>
    </div>
  );
};

export default TotalComment;
