import React, { Component } from 'react'
import { ScreenContainer, ContentContainer, Navigation } from './UI'
import CurrentDrawing from './Screens/CurrentDrawing'
import BuyTicket from './Screens/BuyTicket'

// import Web3 from 'web3'
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      route: 'home',
      options: null
    }
    this.changeRoute = this.changeRoute.bind(this)
  }

  changeRoute(newRoute, options) {
    this.setState({ route: newRoute })
  }
  
  render() {
    let { route, options } = this.state
    return (
      <ScreenContainer>
        <Navigation activeRoute={ route } changeRoute={ this.changeRoute }/>
        <ContentContainer>
          { route === 'home' ? (<CurrentDrawing />) :
            route === 'buy' ? (<BuyTicket options={options}/>) : null}
        </ContentContainer>
      </ScreenContainer>
    )
  }
}

export default App