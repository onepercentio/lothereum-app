import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchLotteries, getNextLottery } from '../Redux/lotteries'
import { changeRoute } from '../Redux/router'
import { fetchTickets, getTicketsForLottery } from '../Redux/tickets'
import { TicketBox, ScreenContainer, BlockContainer, Logo, DrawingInfo } from '../UI'

const mapStateToProps = ({ lotteries, tickets }) => {
  let currentDrawing = getNextLottery(lotteries)
  console.log('curr: ', currentDrawing)
  return { currentDrawing, tickets: getTicketsForLottery(tickets, { lotteryId: currentDrawing.drawingCounter })}
}
const mapDispatchToProps = dispatch => ({
  fetchLotteries: () => dispatch(fetchLotteries()),
  fetchTickets: () => dispatch(fetchTickets()),
  buyTicket: () => dispatch(changeRoute({ route: 'buy' }))
})

class CurrentDrawing extends Component {
  constructor(props){
    super(props)
    this.handleBuyTicket = this.handleBuyTicket.bind(this)
  }

  handleBuyTicket = () => this.props.buyTicket()

  render() {
    let {
      currentDrawing: { drawingCounter, prize, nextDrawingDate },
      tickets
    } = this.props

    return (
      <ScreenContainer>
        <BlockContainer>
          <Logo />
          <DrawingInfo id={drawingCounter} prize={prize} date={nextDrawingDate}/>
        </BlockContainer>
        <BlockContainer>
          <TicketBox
            tickets={ tickets }
            onBuyOne={ this.handleBuyTicket }
            />
        </BlockContainer>
      </ScreenContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentDrawing)
