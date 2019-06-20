import React from 'react'


class WeatherCard extends React.Component {

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-divider">
            {this.props.city}              </div>
          <div className="card-section">
            <h4>{this.props.degree}º</h4>
            <p>{this.props.details}</p>
          </div>
        </div>
      </div>
    )
  }

}

export default WeatherCard;