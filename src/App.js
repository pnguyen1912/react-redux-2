import React from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { addHistory } from './store/action'
import { connect } from 'react-redux'
import ForeCast from './components/ForeCast'
import Home from './components/Home'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      currentLocation: 'Current Location',
      currentDegree: '--',
      currentDetails: '--',
      currentIcon: '',
      errorMessage: '',
      city1: this.props.city[0].name,
      city2: this.props.city[1].name,
      waiting: true,
    }
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position)
        let lat = position.coords.latitude
        let long = position.coords.longitude
        axios.get(`https://api.openweathermap.org/data/2.5/weather?APPID=4a5ca2f74c03252e2458e71a91e38bdf&lat=${lat}&lon=${long}&units=imperial`)
          .then(response => {
            console.log(response)
            this.setState({ currentLocation: `${response.data.name}, ${response.data.sys.country}`, currentIcon: response.data.weather[0].icon, currentDegree: Math.floor(response.data.main.temp), currentDetails: response.data.weather[0].main, waiting: false })

          })
          .catch(err => console.log(err))


      },
      err => {
        this.setState({ errorMessage: "Error" });
      }
    );
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city1}&units=imperial&APPID=4a5ca2f74c03252e2458e71a91e38bdf`)
      .then(response => {
        console.log(response)
        this.setState({ city1Temp: Math.floor(response.data.main.temp), city1Details: response.data.weather[0].main, city1Icon: response.data.weather[0].icon })
      })
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city2}&units=imperial&APPID=4a5ca2f74c03252e2458e71a91e38bdf`)
      .then(response => {
        console.log(response)
        this.setState({ city2Temp: Math.floor(response.data.main.temp), city2Details: response.data.weather[0].main, city2Icon: response.data.weather[0].icon })
      })
  }


  checkInput(event) {
    if (event === '') {
      console.log('Cannot be empty')
      this.setState({ success: false })
      return false
    }
    if (this.props.history.map(item => item.name).includes(event)) {
      return false
    }
    return true
  }



  searchCity = () => {
    if (this.checkInput(this.state.input)) {
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&units=imperial&APPID=4a5ca2f74c03252e2458e71a91e38bdf`)
        .then(response => {
          response.data.name = `${response.data.name}, ${response.data.sys.country}`
          this.props.addHistory(response.data)
          this.setState({ input: '' })
        })


    }

  }


  render() {
    return (
      <BrowserRouter>
        <div >
          <Link to='/'><header>
            Acme Weather</header></Link>
          <input value={this.state.input} onChange={e => this.setState({ input: e.target.value })} onKeyDown={e => e.key === 'Enter' ? this.searchCity() : null} placeholder="Search City" type="text" />
          <ul className="menu" >
            {this.props.history.map(e =>
              <Link to={`/${e.name}`} >{e.name} {Math.floor(e.main.temp)}° <img style={{ height: '80%' }} src={`http://openweathermap.org/img/w/${e.weather[0].icon}.png`} alt=""></img></Link>

            )}
            <Link to={`/${this.state.currentLocation}`}>{this.state.currentLocation} {this.state.currentDegree}°<img style={{ height: '80%' }} src={`http://openweathermap.org/img/w/${this.state.currentIcon}.png`} alt=""></img></Link>
          </ul>







          <Route exact path='/' render={() => <Home state={this.state} />} />
          <Route path={`/${this.state.currentLocation}`} render={() => <ForeCast cityname={this.state.currentLocation} />} />
          {this.props.history.map(e =>
            <Route path={`/${e.name}`} render={() => <ForeCast cityname={e.name} />} />
          )
          }
          <Route path={`/${this.state.city1}`} render={() => <ForeCast cityname={this.state.city1} />} />
          <Route path={`/${this.state.city2}`} render={() => <ForeCast cityname={this.state.city2} />} />



        </div>
      </BrowserRouter>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    addHistory: city => dispatch(addHistory(city)),
  }
}
const mapStateToProps = state => {
  return {
    history: state.history,
    city: state.city
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)