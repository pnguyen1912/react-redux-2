import React from 'react'
import { connect } from 'react-redux'
import { addNumber } from '../store/action.js'

class NewComponent extends React.Component {

  state = {
    newNumber: 0
  }

  addNumber = () => {
    const temp = this.state.newNumber + 1;
    this.setState({ newNumber: temp })
  }

  render() {
    return (
      <div>
        <h1>{this.state.newNumber}</h1>
        <button onClick={this.addNumber}>Increase</button>
      </div>
    )
  }

}

export default NewComponent;