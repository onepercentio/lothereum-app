import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './Redux/store'

import { ScreenContainer, ContentContainer, Navigation } from './UI'
import { CurrentDrawing, BuyTicket, MyAccount } from './Screens'


const routes = [{ name: 'home', title: 'Home' }, { name: 'buy', title: 'Buy Ticket' }, { name: 'account', title: 'My Account' }]

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
      <Provider store={store}>
        <ScreenContainer>
          <Navigation
            activeRoute={ route } 
            changeRoute={ this.changeRoute }
            routes={ routes }/>
          <ContentContainer>
            { route === 'home' ? <CurrentDrawing /> :
              route === 'buy' ? <BuyTicket options={options}/> :
              route === 'account' ? <MyAccount /> : null } 
          </ContentContainer>
        </ScreenContainer>
      </Provider>
    )
  }
}

export default App