import React from 'react'
import WeatherCard from './WeatherCard'
import axios from 'axios'

class ForeCast extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startingDay: new Date().getDay()
    }
  }

  componentDidMount() {
    axios.get(`http://api.openweathermap.org/data/2.5/daily?q=${this.props.city}&APPID=4a5ca2f74c03252e2458e71a91e38bdf`)
      .then(response => console.log(response))
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


  render() {
    return (
      <div>
        <h1>{this.props.city}</h1>
        <div className="row">
          <div className="columns"><WeatherCard city='Current' degree='--' details='--' /></div>
          <div className="columns"><WeatherCard city='Today' degree='--' details='--' /></div>
          <div className="columns"><WeatherCard city={this.getDayOfTheWeek(this.state.startingDay + 1)} degree='--' details='--' /></div>
          <div className="columns"><WeatherCard city={this.getDayOfTheWeek(this.state.startingDay + 2)} degree='--' details='--' /></div>
          <div className="columns"><WeatherCard city={this.getDayOfTheWeek(this.state.startingDay + 3)} degree='--' details='--' /></div>
          <div className="columns"><WeatherCard city={this.getDayOfTheWeek(this.state.startingDay + 4)} degree='--' details='--' /></div>
        </div>
        <div className="card">
          <div className="card-divider">
            Current Condition             </div>
          <div className="card-section">
            <div style={{ float: "left" }}>
              <p>Current</p>
              <p>Low</p>
              <p>High</p>
            </div>
            <div style={{ float: 'right' }}>
              <p>Humidity</p>
              <p>Wind</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ForeCast