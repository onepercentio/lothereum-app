import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchLotteries, getNextLottery } from '../Redux/lotteries'
import { fetchTickets, getTicketsForLottery } from '../Redux/tickets'
import { Ticket, TicketBox, ScreenContainer, BlockContainer, Logo, DrawingInfo } from '../UI'

const mapStateToProps = ({ lotteries, tickets }) => {
  let currentDrawing = getNextLottery(lotteries)
  return { currentDrawing, tickets: getTicketsForLottery(tickets, { lotteryId: currentDrawing.id })}
}
const mapDispatchToProps = dispatch => ({
  fetchLotteries: () => dispatch(fetchLotteries()),
  fetchTickets: () => dispatch(fetchTickets())
})

class CurrentDrawing extends Component {

  render() {
    let { 
      currentDrawing: { id: lotteryId, prize, date },
      tickets  
    } = this.props

    return (
      <ScreenContainer>
        <BlockContainer>
          <Logo />
          <DrawingInfo id={lotteryId} prize={prize} date={date}/>
        </BlockContainer>
        <BlockContainer>
        { tickets.length < 1 ? 
          <TicketBox /> :
          tickets.map(ticket => 
            <Ticket
              key={ticket.id}
              ticketId={ticket.id}
              numbers={ticket.numbers} />
          )
        }
        </BlockContainer>
      </ScreenContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentDrawing)