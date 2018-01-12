import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import store from './Redux/store'
import { changeRoute } from './Redux/router'

import { ScreenContainer, ContentContainer, Navigation } from './UI'
import { CurrentDrawing } from './Screens'

// import Web3 from 'web3'

const routes = [{ name: 'home', title: 'Home' }]

// const lothereumAddr = '0x232d0444cfbeb141ef6bddda25634f9fa91587b7'

// window.web3 = web3;

const mapStateToProps = ({ router }) => ({ ...router })
const mapDispatchToProps = dispatch => ({ changeRoute: route => dispatch(changeRoute(route))})

const Router = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
  render() {
    let { route, options, changeRoute } = this.props
    return <ScreenContainer>
      <Navigation
        activeRoute={ route } 
        routeOptions={ options }
        changeRoute={ changeRoute }
        routes={ routes }/>
      <ContentContainer>
        { route === 'home' ? <CurrentDrawing /> : null } 
      </ContentContainer>
    </ScreenContainer>
  }
})

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App
