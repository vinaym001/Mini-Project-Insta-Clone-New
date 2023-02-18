import './index.css'

const NotFound = props => {
  const onHome = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="cont">
      <img
        src="https://res.cloudinary.com/dzf4nrbvt/image/upload/v1676703538/erroring_1_w1tnrh.png"
        alt="page not found"
        className="page-not-found"
      />
      <h1 className="nf-h">Page Not Found</h1>
      <p className="nf-p">
        we are sorry, the page you requested could not be found. <br /> Please
        go back to the homepage.
      </p>
      <button type="button" className="not-found-home" onClick={onHome}>
        Home Page
      </button>
    </div>
  )
}

export default NotFound
