import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FaSearch} from 'react-icons/fa'
import './index.css'

class Header extends Component {
  state = {searchInput: '', searchResultList: []}

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
      this.setState({searchResultList: searchData})
    }
  }

  render() {
    const {searchInput, searchResultList} = this.state

    return (
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
                //   testid="searchIcon"
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
    )
  }
}

export default Header
