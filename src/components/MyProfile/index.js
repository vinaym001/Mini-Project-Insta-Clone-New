import './index.css'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

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
    <div className="user-profile-bg">
      <div className="bio-container">
        <div className="profile-img-container">
          <img src={profilePic} alt="my profile" className="profile-img" />
        </div>
        <div className="profile-info">
          <h1 className="pro-username">{userName}</h1>
          <div className="count-container">
            <p className="pro-post-count">
              <span className="bold-count">{postsCount}</span> posts
            </p>
            <p className="pro-follrs-count">
              <span className="bold-count">{followersCount}</span> followers
            </p>
            <p className="pro-follng-count">
              <span className="bold-count">{followingCount}</span> following
            </p>
          </div>
          <p className="pro-name">{userId}</p>
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
        <BsGrid3X3 size={25} />
        <h1 className="post-txt">Posts</h1>
      </div>
      {posts.length === 0 ? (
        <>
          <BiCamera />
          <h1>No Posts</h1>
        </>
      ) : (
        <ul className="pro-post-container">
          {posts?.map(eachItem => (
            <li key={eachItem.id}>
              <img
                src={eachItem.image}
                alt="my post"
                className="pro-post-img"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyProfile
