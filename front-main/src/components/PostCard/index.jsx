import "./post.css";
import { Link } from "react-router-dom";
import elapsed from "../../utils/elapsed";
import { FaRegCommentAlt } from "react-icons/fa";
import Like from "../Like";
import { userService } from "../../utils/userService";
import { useEffect, useState } from "react";
import TotalComment from "../TotalComment";

const PostCard = ({ post }) => {
  const createdAt = post.creation;
  const category = ["test", "test"];

  const [user, setUser] = useState(null);
  useEffect(() => {
    // Abonnement aux mises à jour de l'utilisateur à l'aide du service userService
    const subscription = userService.user.subscribe((x) => setUser(x));

    // Nettoyage de l'abonnement lors de la destruction du composant

    return () => subscription.unsubscribe();
  }, []);

  console.log(user);
  let timeAgo = elapsed(createdAt);
  return (
    <div className="card mb-3">
      <div className="card-header">
        <div className="header-left">
          <div className="header-profile">
            <img src="profile.png" alt="profile" />
          </div>
          <div className="header-category">
            <p>{post.id_topic}</p>
          </div>
          <div className="header-date">
            <p>{timeAgo} </p>
          </div>
        </div>
        <div className="header-right">
          <Link to={`/post/${post.id}`}>
            <button type="button" className="btn btn-primary">
              voir
            </button>
          </Link>
        </div>
      </div>
      <div className="card-body">
        <div className="body-left">
          <h6 className="card-title">{post.title}</h6>
          <p className="card-text">{post.content}</p>
        </div>
        <div className="body-right"></div>
      </div>
      <div className="card-footer">
        <div className="card-footer-like">
          {user && <Like id_post={post.id} id_user={user.userId} />}
        </div>
        {user ? (
          <TotalComment id_post={post.id} />
        ) : (
          "Pour intéragir vous devez vous connecter / inscrire"
        )}
      </div>
    </div>
  );
};

export default PostCard;
