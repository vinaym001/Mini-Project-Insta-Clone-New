import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import './index.css'

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Slicker extends Component {
  renderSlider = () => {
    const {homeStoryDetails} = this.props
    return (
      <Slider {...settings}>
        <li className="slick-item" key={homeStoryDetails.userId}>
          <img
            className="logo-image"
            src={homeStoryDetails.storyUrl}
            alt="user story"
          />
          <p className="stories-name">{homeStoryDetails.userName}</p>
        </li>
      </Slider>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  render() {
    const {homeStoryDetails} = this.props
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default Slicker
