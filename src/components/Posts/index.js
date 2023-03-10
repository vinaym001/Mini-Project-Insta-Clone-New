import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'

class Posts extends Component {
  state = {isLiked: false}

  onLiked = async () => {
    const {isLiked} = this.state
    const {postDetailsItems} = this.props
    const {postId} = postDetailsItems
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const reqObj = {like_status: !isLiked}

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(reqObj),
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      this.setState({isLiked: !isLiked})
    }
  }

  render() {
    const {isLiked} = this.state
    const {postDetailsItems} = this.props

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
                onClick={this.onLiked}
                testid="unLikeIcon"
              >
                <FcLike size={25} />
              </button>
            ) : (
              <button
                type="button"
                className="social-buttons"
                onClick={this.onLiked}
                testid="likeIcon"
              >
                <BsHeart size={25} />
              </button>
            )}
            <button type="button" className="social-buttons">
              <FaRegComment size={25} />
            </button>
            <button type="button" className="social-buttons">
              <BiShareAlt size={25} />
            </button>
          </div>
          {isLiked ? (
            <p className="post-likes">{likesCount + 1} likes</p>
          ) : (
            <p className="post-likes">{likesCount} likes</p>
          )}
          <p className="caption">{postDetails.caption}</p>
          <ul className="comment-container">
            {comments.map(eachItem => (
              <li className="post-comments" key={eachItem.user_id}>
                <p>
                  <span className="span-element">{eachItem.user_name} </span>
                  {eachItem.comment}
                </p>
              </li>
            ))}
          </ul>
          <p className="time">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default Posts
