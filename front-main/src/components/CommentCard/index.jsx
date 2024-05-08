import "./comment.css";
import { Link } from 'react-router-dom';
import elapsed from "../../utils/elapsed";
import { AiTwotoneLike } from "react-icons/ai";
import { AiTwotoneDislike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";


const CommentCard = ({ comment }) => {
  const createdAt = comment.publication;

  let timeAgo = elapsed(createdAt);
  return (
    <div className="card mb-3">
      <div className="card-header">
        <div className="header-left">
          <div className="header-profile">
            <img src="profile.png" alt="profile" />
          </div>
          <div className="header-date">
            <p>{timeAgo} </p>
          </div>
        </div>
        <div className="header-right">
        </div>
      </div>
      <div className="card-body">
        <div className="body-left">
          <p className="card-text">{comment.content}</p>
        </div>
        <div className="body-right"></div>
      </div>
      <div className="card-footer">
        <div className="card-footer-like">
          <button type="button" className="btn btn-primary">
          <AiTwotoneLike />
          </button>
          <p>{comment.liked}</p>
          <button type="button" className="btn btn-primary">
          <AiTwotoneDislike />
          </button>
        </div>
        <div className="card-footer-comment">
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;