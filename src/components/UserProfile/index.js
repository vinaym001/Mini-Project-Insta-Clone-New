import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserProfileDetails from '../UserProfileDetails'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class UserProfile extends Component {
  state = {userProfileData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const {match} = this.props
    const {params} = match
    const {userId} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const userDetails = data.user_details
      const UserData = {
        id: userDetails.id,
        userId: userDetails.user_id,
        userName: userDetails.user_name,
        profilePic: userDetails.profile_pic,
        followersCount: userDetails.followers_count,
        followingCount: userDetails.following_count,
        userBio: userDetails.user_bio,
        posts: userDetails.posts,
        postsCount: userDetails.posts_count,
        stories: userDetails.stories,
      }
      this.setState({
        userProfileData: UserData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.fail})
    }
  }

  renderUserProfileData = () => {
    const {userProfileData} = this.state
    return (
      <div>
        <UserProfileDetails userProfileData={userProfileData} />
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailView = () => (
    <>
      <img
        src="https://res.cloudinary.com/dzf4nrbvt/image/upload/v1676539801/alert-triangle_hkmcpf.png"
        alt="page not found"
        className="page not found"
      />
      <p className="home-fail-text">Something went wrong. Please try again</p>
      <button type="button" className="retry-btn" onClick={this.getUserProfile}>
        Try again
      </button>
    </>
  )

  renderViewOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderUserProfileData()
      case apiStatusConstants.fail:
        return this.renderFailView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="user-profile-bg-container">
        <Header />
        {this.renderViewOnApiStatus()}
      </div>
    )
  }
}

export default UserProfile
