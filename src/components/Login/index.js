import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie' // *{Cookies}
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', errMsg: ''}

  onNameInput = event => {
    this.setState({username: event.target.value})
  }

  onPasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const data = await response.json()
      const errMsg = data.error_msg
      this.setState({errMsg})
    }
  }

  render() {
    const {username, password, errMsg} = this.state
    const isError = errMsg !== ''
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <img
          src="https://res.cloudinary.com/dzf4nrbvt/image/upload/v1676516961/Layer_2_xnbq2w.png"
          alt="website login"
          className="login-img"
        />
        <div className="login-container">
          <img
            src="https://res.cloudinary.com/dzf4nrbvt/image/upload/v1676516080/insta_icon_login_cvg0vu.svg"
            alt="website logo"
            className="login-logo-img"
          />
          <form className="login-form" onSubmit={this.onLogin}>
            <h1 className="login-hed">Insta Share</h1>
            <label htmlFor="login-name" className="login-label">
              USERNAME
            </label>
            <input
              type="text"
              id="login-name"
              className="login-input"
              placeholder="Enter Username"
              onChange={this.onNameInput}
              value={username}
            />
            <label htmlFor="login-password" className="login-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="login-password"
              className="login-input"
              placeholder="Enter Password"
              onChange={this.onPasswordInput}
              value={password}
            />
            {isError && <p className="err-msg">{errMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
