import React, { Component } from 'react'
import { ScreenContainer } from './UI'
import CurrentDrawing from './CurrentDrawing'

// import Web3 from 'web3'
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      route: 'home'
    }
  }

  changeRoute(newRoute) {
    this.setState({ route: newRoute })
  }
  
  render() {
    let { route } = this.state
    return (
      <ScreenContainer>
        { route === 'home' ? (<CurrentDrawing />) : null }
      </ScreenContainer>
    )
  }
}

export default App