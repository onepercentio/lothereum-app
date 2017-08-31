import React, { Component } from 'react'
import { Ticket, TicketBox, ScreenContainer, BlockContainer, Logo, DrawingInfo } from '../UI'

class CurrentDrawing extends Component {

  render() {
    return (
      <ScreenContainer>
        <BlockContainer>
          <Logo />
          <DrawingInfo id={743876} prize={30943123}/>
        </BlockContainer>
        <BlockContainer>
          <TicketBox />
          {/*<Ticket ticketId={123456} numbers={[10,20,30,40,50,60]} />*/}
        </BlockContainer>
      </ScreenContainer>
    )
  }
}

export default CurrentDrawing