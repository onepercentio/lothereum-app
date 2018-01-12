import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchLotteries, getNextLottery } from '../Redux/lotteries'
import { changeRoute } from '../Redux/router'
import { fetchTickets } from '../Redux/tickets'
import { ScreenContainer, BlockContainer, } from '../UI'

const mapStateToProps = ({ lotteries, tickets }) => {
  let currentDrawing = lotteries
  return { currentDrawing }
}
const mapDispatchToProps = dispatch => ({
  fetchLotteries: () => dispatch(fetchLotteries()),
  fetchTickets: () => dispatch(fetchTickets()),
  buyTicket: () => dispatch(changeRoute({ route: 'buy' }))
})

class CurrentDrawing extends Component {
  render() {
    let {
      currentDrawing
    } = this.props

    return (
      <ScreenContainer>
        <BlockContainer>
          {JSON.stringify(currentDrawing)}
        </BlockContainer>
      </ScreenContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentDrawing)
