import "./post.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PostJumbo from "../../components/PostJumbo";
import CommentCard from "../../components/CommentCard";
import { Link } from "react-router-dom";

const Post = () => {
  const { id_post } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem("user"));
    if (actualUser && actualUser !== undefined) {
      setUserId(actualUser.userId);
    }
  }, []);
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/post/readOnePost?id=${id_post}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setPost(response.data.post);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/comment/readComment?id=${id_post}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>Post</div>

      {userId ? (
        <Link
          to={`/createcomment/${id_post}`}
          className="submitButton"
          aria-label="Créer comment"
        >
          Créer comment
        </Link>
      ) : null}

      {post ? <PostJumbo post={post} /> : null}

      <br />

      {comments &&
        comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
    </div>
  );
};

export default Post;
