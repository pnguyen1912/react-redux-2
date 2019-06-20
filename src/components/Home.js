import React from 'react'
import WeatherCard from './WeatherCard'
import { Link, Route } from 'react-router-dom'
import ForeCast from './ForeCast'
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (

      <div className='row' >
        <div className='small-4 columns' >
          <Link to={`/${this.props.state.currentLocation}`} ><WeatherCard city={this.props.state.currentLocation} degree={this.props.state.currentDegree} details={this.props.state.currentDetails} /></Link>
        </div>
        <div className='columns' > <Link to={`/${this.props.state.city1}`}>< WeatherCard city={this.props.state.city1} degree={this.props.state.city1Temp} details={this.props.state.city1Details} /></Link>
        </div>
        <div className='columns' >
          <Link to={`/${this.props.state.city2}`}><WeatherCard city={this.props.state.city2} degree={this.props.state.city2Temp} details={this.props.state.city2Details} /></Link>
        </div>
        <Route path={`/${this.props.state.currentLocation}`} render={() => <ForeCast city={this.props.state.currentLocation} />} />


      </div >


    )
  }
}

export default Home