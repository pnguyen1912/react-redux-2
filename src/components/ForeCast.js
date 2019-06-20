import React from 'react'
import WeatherCard from './WeatherCard'
import axios from 'axios'
import { addCity } from '../store/action'
import { connect } from 'react-redux'

class ForeCast extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startingDay: new Date().getDay(),
      currentDegree: '--',
      todayDegree: '--',
      day1Degree: '--',
      day2Degree: '--',
      day3Degree: '--',
      day4Degree: '--',
      currentIcon: '--',
      todayIcon: '--',
      day1Icon: '--',
      day2Icon: '--',
      day3Icon: '--',
      day4Icon: '--',
      currentDetails: '--',
      todayDetails: '--',
      day1Details: '--',
      day2Details: '--',
      day3Details: '--',
      day4Details: '--',
      currentLow: '--',
      currentHigh: '--',
      humidity: '--',
      wind: '--',
      windDegree: 0,
    }
  }

  componentDidMount() {
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.props.cityname}&units=imperial&APPID=4a5ca2f74c03252e2458e71a91e38bdf`)
      .then(response => {
        console.log(response)
        this.setState({
          currentDegree: Math.floor(response.data.list[0].main.temp),
          currentLow: Math.floor(response.data.list[0].main.temp_min),
          currentHigh: Math.floor(response.data.list[0].main.temp_max),
          humidity: Math.floor(response.data.list[0].main.humidity),
          wind: Math.floor(response.data.list[0].wind.speed),
          windDegree: Math.floor(response.data.list[0].wind.deg),
          todayDegree: Math.floor(response.data.list[3].main.temp),
          day1Degree: Math.floor(response.data.list[11].main.temp),
          day2Degree: Math.floor(response.data.list[19].main.temp),
          day3Degree: Math.floor(response.data.list[27].main.temp),
          day4Degree: Math.floor(response.data.list[35].main.temp),
          currentIcon: response.data.list[0].weather[0].icon,
          todayIcon: response.data.list[3].weather[0].icon,
          day1Icon: response.data.list[11].weather[0].icon,
          day2Icon: response.data.list[19].weather[0].icon,
          day3Icon: response.data.list[27].weather[0].icon,
          day4Icon: response.data.list[35].weather[0].icon,
          currentDetails: response.data.list[0].weather[0].main,
          todayDetails: response.data.list[3].weather[0].main,
          day1Details: response.data.list[11].weather[0].main,
          day2Details: response.data.list[19].weather[0].main,
          day3Details: response.data.list[27].weather[0].main,
          day4Details: response.data.list[35].weather[0].main,
        })
      })
  }

  getDayOfTheWeek = (val) => {
    if (val === 1) { return 'Monday' }
    else if (val === 2) { return 'Tuesday' }
    else if (val === 3) { return 'Wednesday' }
    else if (val === 4) { return 'Thursday' }
    else if (val === 5) { return 'Friday' }
    else if (val === 6) { return 'Saturday' }
    else if (val === 0) { return 'Sunday' }
    else if (val === 7) { return 'Sunday' }
    else {
      val = val - 7
      return this.getDayOfTheWeek(val)
    }
  }

  converDegreeToCompas = (val) => {
    if (val < 20) { return "N" }
    else if (val > 20 && val <= 70) { return 'NE' }
    else if (val > 70 && val <= 110) { return 'E' }
    else if (val > 110 && val <= 160) { return 'SE' }
    else if (val > 160 && val <= 200) { return 'S' }
    else if (val > 200 && val <= 250) { return 'SW' }
    else if (val > 250 && val <= 300) { return 'W' }
    else if (val > 300 && val <= 340) { return 'NW' }
    else if (val > 340) { return 'N' }
  }


  addToHome = () => {
    let city = {
      name: `${this.props.cityname}`,
      icon: `${this.state.currentIcon}`,
      degree: `${this.state.currentDegree}`,
      details: `${this.state.currentDetails}`,
    }
    this.props.addCity(city)
  }

  render() {
    return (
      <div>
        <h1>{this.props.cityname}
          {!this.props.city.map(i => i.name).includes(this.props.cityname) && <button onClick={this.addToHome} className='button'>Add To Home</button>}
        </h1>
        <div className="row">
          <div className="columns"><WeatherCard city='Current' degree={this.state.currentDegree} details={this.state.currentDetails} icon={this.state.currentIcon} /></div>
          <div className="columns"><WeatherCard city='Today' degree={this.state.todayDegree} details={this.state.todayDetails} icon={this.state.todayIcon} /></div>
          <div className="columns"><WeatherCard city={this.getDayOfTheWeek(this.state.startingDay + 1)} degree={this.state.day1Degree} details={this.state.day1Details} icon={this.state.day1Icon} /></div>
          <div className="columns"><WeatherCard city={this.getDayOfTheWeek(this.state.startingDay + 2)} degree={this.state.day2Degree} details={this.state.day2Details} icon={this.state.day2Icon} /></div>
          <div className="columns"><WeatherCard city={this.getDayOfTheWeek(this.state.startingDay + 3)} degree={this.state.day3Degree} details={this.state.day3Details} icon={this.state.day3Icon} /></div>
          <div className="columns"><WeatherCard city={this.getDayOfTheWeek(this.state.startingDay + 4)} degree={this.state.day4Degree} details={this.state.day4Details} icon={this.state.day4Icon} /></div>
        </div>
        <div className="card">
          <div className="card-divider">
            Current Condition             </div>
          <div className="card-section">
            <div className="row">
              <div className="small-4 columns"><p>Current: {this.state.currentDegree}º</p>
                <p>Low: {this.state.currentLow}º</p>
                <p>High: {this.state.currentHigh}º</p>
              </div>
              <div className="columns">              <img style={{ height: '110%' }} src={`http://openweathermap.org/img/w/${this.state.currentIcon}.png`} alt=""></img></div>
              <div className="columns"><p>Humidity: {this.state.humidity}%</p>
                <p>Wind: {this.state.wind} MPH {this.converDegreeToCompas(this.state.windDegree)} </p></div>
            </div>



          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCity: city => dispatch(addCity(city)),
  }
}
const mapStateToProps = state => {
  return {
    city: state.city
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ForeCast)