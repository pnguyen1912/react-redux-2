import React from 'react'
import WeatherCard from './WeatherCard'
import { Link, Route } from 'react-router-dom'
import ForeCast from './ForeCast'
import { connect } from 'react-redux'
import { addCity } from '../store/action'
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div>
        <div className='row' >
          <div className='columns' >
            <Link to={`/${this.props.state.currentLocation}`} ><WeatherCard icon={this.props.state.currentIcon} city={this.props.state.currentLocation} degree={this.props.state.currentDegree} details={this.props.state.currentDetails} /></Link>
          </div>

          <div className='columns' > <Link to={`/${this.props.state.city1}`}>< WeatherCard city={this.props.state.city1} icon={this.props.state.city1Icon} degree={this.props.state.city1Temp} details={this.props.state.city1Details} /></Link>
          </div>
          <div className='columns' >
            <Link to={`/${this.props.state.city2}`}><WeatherCard city={this.props.state.city2} icon={this.props.state.city2Icon} degree={this.props.state.city2Temp} details={this.props.state.city2Details} /></Link>
          </div>
          <Route path={`/${this.props.state.currentLocation}`} render={() => <ForeCast cityname={this.props.state.currentLocation} />} />

        </div >
        <div className='row'>
          {this.props.city.slice(2, this.props.city.length).map(item =>

            <div className='columns' > <Link to={`/${item.name}`}>< WeatherCard city={item.name} icon={item.icon} degree={item.degree} details={item.details} /></Link>
            </div>
          )}
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


export default connect(mapStateToProps, mapDispatchToProps)(Home)