import React, { Component } from 'react'
import { ScreenContainer, ContentContainer, Navigation } from './UI'
import CurrentDrawing from './Screens/CurrentDrawing'
import BuyTicket from './Screens/BuyTicket'
import MyAccount from './Screens/MyAccount'
import Web3 from 'web3'

const routes = [{ name: 'home', title: 'Home' }, { name: 'buy', title: 'Buy Ticket' }, { name: 'account', title: 'My Account' }]

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const lothereumABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ticketPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"drawingIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint32"}],"name":"draws","outputs":[{"name":"status","type":"uint8"},{"name":"total","type":"uint256"},{"name":"ticketCounter","type":"uint256"},{"name":"nextBlockNumber","type":"uint256"},{"name":"feeOnePercent","type":"uint256"},{"name":"donationETHF","type":"uint256"},{"name":"prize","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"drawingInterval","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"drawingId","type":"uint32"},{"name":"number","type":"uint16"}],"name":"numbersMap","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"drawingCounter","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numbersPerTicket","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"prizeDistribution","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"drawingId","type":"uint32"}],"name":"results","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"numbers","type":"uint16[]"},{"name":"withdraw","type":"address"}],"name":"buyTicket","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"ONE_TIPJAR","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"winner","type":"address"}],"name":"prizeDelivery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"maxDrawableNumber","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimalHitsForPrize","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"drawingId","type":"uint32"}],"name":"drawNumber","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"blockInterval","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ETH_TIPJAR","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nextDrawingDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"seedCounter","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"vault","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_drawingInterval","type":"uint256[]"},{"name":"_firstDrawingDate","type":"uint256"},{"name":"_numbersPerTicket","type":"uint8"},{"name":"_maxDrawableNumber","type":"uint16"},{"name":"_ticketPrice","type":"uint256"},{"name":"_prizeDistribution","type":"uint8[]"},{"name":"_blockInterval","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"drawing","type":"uint32"},{"indexed":false,"name":"holder","type":"address"},{"indexed":false,"name":"ticket","type":"uint256"},{"indexed":false,"name":"numbers","type":"uint16[]"}],"name":"NewTicket","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"drawing","type":"uint32"},{"indexed":false,"name":"number","type":"uint16"}],"name":"NumberWasDrawed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"drawing","type":"uint32"},{"indexed":false,"name":"status","type":"uint8"}],"name":"AnnounceDrawing","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"drawing","type":"uint32"},{"indexed":false,"name":"ticket","type":"uint256"},{"indexed":false,"name":"hits","type":"uint8"}],"name":"AnnounceWinner","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"drawing","type":"uint32"},{"indexed":false,"name":"hits","type":"uint8"},{"indexed":false,"name":"numberOfWinners","type":"uint256"},{"indexed":false,"name":"prizeShare","type":"uint256"}],"name":"AnnouncePrize","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"drawing","type":"uint32"},{"indexed":false,"name":"seed","type":"uint256"}],"name":"AnnounceSeed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"fromDrawing","type":"uint32"},{"indexed":false,"name":"total","type":"uint256"},{"indexed":false,"name":"toDrawing","type":"uint32"}],"name":"AccumulatedPrizeMoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"winner","type":"address"},{"indexed":false,"name":"prize","type":"uint256"}],"name":"PrizeWithdraw","type":"event"}]

const lothereumAddr = '0x232d0444cfbeb141ef6bddda25634f9fa91587b7'

window.web3 = web3;

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
    )
  }
}

export default App
