import './index.css'
import {BsGrid3X2} from 'react-icons/bs'

const MyProfile = props => {
  const {myProfileDetails} = props
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
  } = myProfileDetails

  return (
    <div>
      <div className="bio-container">
        <div className="profile-img-container">
          <img src={profilePic} alt="my profile" className="profile-img" />
        </div>
        <div className="profile-info">
          <p className="pro-username">{userName}</p>
          <div className="count-container">
            <p className="pro-post-count">{postsCount} posts</p>
            <p className="pro-follrs-count">{followersCount} followers</p>
            <p className="pro-follng-count">{followingCount} following</p>
          </div>
          <p className="pro-name">{userName}</p>
          <p className="pro-bio">{userBio}</p>
        </div>
      </div>
      <hr />
      <ul className="pro-story-container">
        {stories?.map(eachItem => (
          <li key={eachItem.id}>
            <img
              src={eachItem.image}
              alt="my story"
              className="pro-story-img"
            />
          </li>
        ))}
      </ul>
      <hr className="pro-line" />
      <div className="pro-post-grid">
        <BsGrid3X2 size={25} />
        <p className="post-txt">Posts</p>
      </div>
      <ul className="pro-post-container">
        {posts?.map(eachItem => (
          <li key={eachItem.id}>
            <img src={eachItem.image} alt="my post" className="pro-post-img" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MyProfile
