import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import {Link} from 'react-router-dom'

import {FaSearch} from 'react-icons/fa'
import Loader from 'react-loader-spinner'

import MyProfile from '../MyProfile'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  fail: 'FAILURE',
  noSearchResult: 'NO_SEARCH_RESULT_FOUND',
  noPost: 'NO_POSTS_FOUND',
}

class Profile extends Component {
  state = {
    myProfileDetails: {},
    apiStatus: apiStatusConstants.initial,
    searchResult: {},
    searchInput: '',
  }

  componentDidMount() {
    this.getProfileData()
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchClick = () => {
    this.getSearchResultData()
  }

  onLogout = () => {
    const {history} = this.props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  getSearchResultData = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const searchData = data.posts.map(eachItem => ({
        comments: eachItem.comments,
        createdAt: eachItem.created_at,
        likesCount: eachItem.likes_count,
        postDetails: eachItem.post_details,
        postId: eachItem.post_id,
        profilePic: eachItem.profile_pic,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
      }))
      if (data.total === 0) {
        this.setState({apiStatus: apiStatusConstants.noSearchResult})
      }
      this.setState({
        postsList: searchData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderHeader = () => (
    <>
      <div>
        <nav className="nav-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dzf4nrbvt/image/upload/v1676516080/insta_icon_login_cvg0vu.svg"
              alt="website logo"
              className="header-website-logo"
            />
          </Link>
          <h1 className="logo-name">Insta Share</h1>
          <div className="nav-right-container">
            <div className="search-input-container">
              <input
                type="search"
                placeholder="Search Caption"
                className="header-search-input"
                onChange={this.onSearch}
              />
              <button
                type="button"
                className="search-btn"
                onClick={this.onSearchClick}
                data-testid="searchIcon"
              >
                <FaSearch className="search-icon" />
              </button>
            </div>
            <Link className="home-link" to="/">
              <p>Home</p>
            </Link>
            <Link className="profile-link" to="/profile">
              <p>Profile</p>
            </Link>
            <button
              type="button"
              className="logout-button"
              onClick={this.onLogout}
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </>
  )

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const proData = data.profile
      const profileData = {
        id: proData.id,
        userId: proData.user_id,
        userName: proData.user_name,
        profilePic: proData.profile_pic,
        followersCount: proData.followers_count,
        followingCount: proData.following_count,
        userBio: proData.user_bio,
        posts: proData.posts,
        postsCount: proData.posts_count,
        stories: proData.stories,
      }
      if (data.length === 0) {
        this.setState({apiStatus: apiStatusConstants.noPost})
      }
      this.setState({
        myProfileDetails: profileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.fail})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderUserProfile = () => {
    const {myProfileDetails} = this.state
    return <MyProfile myProfileDetails={myProfileDetails} />
  }

  renderNopostView = () => (
    <>
      <img
        src="https://res.cloudinary.com/dzf4nrbvt/image/upload/v1676702684/cam_kkbxyi.png"
        alt="no posts"
        className="page not found"
      />
      <p className="home-fail-text">No Posts Yet</p>
    </>
  )

  renderFailView = () => {
    const onRetry = () => {
      this.setState(
        {apiStatus: apiStatusConstants.progress},
        this.renderUserProfile,
      )
    }
    return (
      <>
        <img
          src="https://res.cloudinary.com/dzf4nrbvt/image/upload/v1676703538/Group_7522_ukwcn0.png"
          alt="page not found"
          className="page not found"
        />
        <p className="home-fail-text">Something went wrong. Please try again</p>
        <button type="button" className="retry-btn" onClick={onRetry}>
          Try again
        </button>
      </>
    )
  }

  renderViewOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderUserProfile()
      case apiStatusConstants.fail:
        return this.renderFailView()
      case apiStatusConstants.noPost:
        return this.renderNopostView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-bg-container">
        {this.renderHeader()}
        {this.renderViewOnApiStatus()}
      </div>
    )
  }
}

export default Profile
