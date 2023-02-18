import './index.css'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {MdShare} from 'react-icons/md'
import {FcLike} from 'react-icons/fc'

const Posts = props => {
  const {postDetailsItems, onLikeClicked, isLiked} = props

  const onLiked = () => {
    onLikeClicked()
  }

  const {
    postId,
    comments,
    createdAt,
    likesCount,
    postDetails,
    profilePic,
    userId,
    userName,
  } = postDetailsItems
  return (
    <li className="post-li-container">
      <div className="post-upper-container">
        <Link to={`/users/${userId}`}>
          <img
            src={profilePic}
            alt="post author profile"
            className="post-user-profile-img"
          />
        </Link>
        <Link to={`/users/${userId}`}>
          <p className="post-username">{userName}</p>
        </Link>
      </div>

      <div className="post-img">
        <img
          src={postDetails.image_url}
          alt="post"
          className="user-post-image"
        />
      </div>

      <div className="post-lower-container">
        <div className="social-button-container">
          {isLiked ? (
            <button
              type="button"
              className="social-buttons"
              onClick={onLiked}
              data-testid="unLikeIcon"
            >
              <FcLike size={25} />
            </button>
          ) : (
            <button
              type="button"
              className="social-buttons"
              onClick={onLiked}
              data-testid="likeIcon"
            >
              <BsHeart size={25} />
            </button>
          )}
          <button type="button" className="social-buttons">
            <FaRegComment size={25} />
          </button>
          <button type="button" className="social-buttons">
            <MdShare size={25} />
          </button>
        </div>
        {isLiked ? (
          <p className="post-likes">{likesCount + 1} likes</p>
        ) : (
          <p className="post-likes">{likesCount} likes</p>
        )}
        <ul className="comment-container">
          {comments.map(eachItem => (
            <li className="post-comments" key={eachItem.user_id}>
              <span className="span-element">{eachItem.user_name} </span>
              {eachItem.comment}
            </li>
          ))}
        </ul>
        <p className="time">{createdAt}</p>
      </div>
    </li>
  )
}

export default Posts
