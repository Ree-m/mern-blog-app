import { format } from "date-fns"
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, content, cover, author, createdAt }) => {
  return (
    <div className="post">

      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:4000/${cover}`} alt="" />
        </Link>
      </div>

      <div className="text">
        <Link to={`/post/${_id}`}>

          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a href="" className="author">{author.username}</a>
          <time>{format(new Date(createdAt), 'MMM dd, yyyy k:mm:ss')}</time>
        </p>
        <p>{summary}</p>
      </div>

    </div>
  );
}

export default Post;