import './index.css'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

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
          <h1 className="user-username">{userName}</h1>
          <div className="count-container">
            <p className="user-post-count">
              <span className="bold-count">{postsCount}</span> posts
            </p>
            <p className="user-follrs-count">
              <span className="bold-count">{followersCount}</span> followers
            </p>
            <p className="user-follng-count">
              <span className="bold-count">{followingCount}</span> following
            </p>
          </div>
          <p className="user-name">{userId}</p>
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
        <BsGrid3X3 size={25} />
        <h1 className="post-txt">Posts</h1>
      </div>
      {posts.length !== 0 ? (
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
      ) : (
        <>
          <BiCamera />
          <h1>No Posts</h1>
        </>
      )}
    </div>
  )
}

export default UserProfileDetails
