import './index.css'
import {BsGrid3X2} from 'react-icons/bs'

const UserProfileDetails = props => {
  const {userProfileData} = props
  const {
    id,
    userId,
    userName,
    profilePic,
    followersCount,
    followingCount,
    userBio,
    posts,
    postsCount,
    stories,
  } = userProfileData

  return (
    <div>
      <div className="user-bio-container">
        <div className="user-img-container">
          <img src={profilePic} alt="user profile" className="user-img" />
        </div>
        <div className="user-info">
          <p className="user-username">{userName}</p>
          <div className="count-container">
            <p className="user-post-count">{postsCount} posts</p>
            <p className="user-follrs-count">{followersCount} followers</p>
            <p className="user-follng-count">{followingCount} following</p>
          </div>
          <p className="user-name">{userName}</p>
          <p className="user-bio">{userBio}</p>
        </div>
      </div>

      <ul className="user-story-container ">
        {stories?.map(eachItem => (
          <li key={eachItem.id}>
            <img
              src={eachItem.image}
              alt="user story"
              className="user-story-img"
            />
          </li>
        ))}
      </ul>
      <hr className="line" />
      <div className="post-grid">
        <BsGrid3X2 size={25} />
        <p className="post-txt">Posts</p>
      </div>
      <ul className="user-post-container">
        {posts?.map(eachItem => (
          <li key={eachItem.id}>
            <img
              src={eachItem.image}
              alt="user post"
              className="user-post-img"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserProfileDetails
