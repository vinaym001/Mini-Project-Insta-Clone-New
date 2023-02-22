import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FaSearch} from 'react-icons/fa'

import Loader from 'react-loader-spinner'
import Slicker from '../Slicker'
import Posts from '../Posts'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  fail: 'FAILURE',
  noSearchResult: 'NO_SEARCH_RESULT_FOUND',
  noPost: 'NO_POSTS_FOUND',
}

class Home extends Component {
  state = {
    storyDataList: [],
    postsList: [],
    isLiked: false,
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getUserStoryData()
    this.getPostData()
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchClick = () => {
    this.getSearchResultData()
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
            <button type="button" className="logout-button">
              Logout
            </button>
          </div>
        </nav>
      </div>
    </>
  )

  getPostData = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        //* headers should be separate object in options
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const postData = data.posts.map(eachItem => ({
        comments: eachItem.comments,
        createdAt: eachItem.created_at,
        likesCount: eachItem.likes_count,
        postDetails: eachItem.post_details,
        postId: eachItem.post_id,
        profilePic: eachItem.profile_pic,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
      }))
      this.setState({
        postsList: postData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.fail})
    }
  }

  getUserStoryData = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        //* headers should be separate object in options
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const storyData = data.users_stories.map(eachItem => ({
        storyUrl: eachItem.story_url,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
      }))
      this.setState({
        storyDataList: storyData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onLikeClicked = async postId => {
    const {isLiked} = this.state
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

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderPosts = () => {
    const {postsList, isLiked} = this.state
    return (
      <ul>
        {postsList.map(eachItem => (
          <Posts
            key={eachItem.postId}
            postDetailsItems={eachItem}
            onLikeClicked={this.onLikeClicked}
            isLiked={isLiked}
          />
        ))}
      </ul>
    )
  }

  renderFailView = () => {
    const onRetry = () => {
      this.setState({apiStatus: apiStatusConstants.progress}, this.getPostData)
    }
    return (
      <>
        <img
          src="https://res.cloudinary.com/dzf4nrbvt/image/upload/v1676539801/alert-triangle_hkmcpf.png"
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

  renderNoSearchFoundView = () => {
    const onRetry = () => {
      this.setState({apiStatus: apiStatusConstants.progress}, this.getPostData)
    }
    return (
      <>
        <img
          src="https://res.cloudinary.com/dzf4nrbvt/image/upload/v1676539801/alert-triangle_hkmcpf.png"
          alt="search not found"
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
        return this.renderPosts()
      case apiStatusConstants.fail:
        return this.renderFailView()
      case apiStatusConstants.noSearchResult:
        return this.renderNoSearchFoundView()
      default:
        return null
    }
  }

  render() {
    const {storyDataList} = this.state
    return (
      <div className="home-bg-container">
        {this.renderHeader()}
        <ul className="home-story-ul-container">
          {storyDataList.map(eachItem => (
            <Slicker homeStoryDetails={eachItem} key={eachItem.userId} />
          ))}
        </ul>
        {this.renderViewOnApiStatus()}
      </div>
    )
  }
}

export default Home
