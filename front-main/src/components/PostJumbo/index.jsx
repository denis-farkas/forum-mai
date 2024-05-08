import { Link } from "react-router-dom";
import elapsed from "../../utils/elapsed";
import "./postjumbo.css";

const PostJumbo = ({ post }) => {
  const createdAt = post.creation;
  const category = ["test", "test"];

  let timeAgo = elapsed(createdAt);

  return (
    <>
      <div className="card-jumbo">
        <div className="card-jumbo-body">
          <h4 className="card-title">
            Titre: {post.title}{" "}
            <span className="card-subtitle mb-2 text-muted">
              dans la catégorie: {post.id_topic}
            </span>
          </h4>

          <p className="card-text">Contenu: {post.content}</p>
          <small>Posté, {timeAgo}</small>
        </div>
      </div>
    </>
  );
};

export default PostJumbo;
