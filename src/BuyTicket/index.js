import React, { Component } from 'react'
import { ScreenContainer, BlockContainer, Logo, DrawingInfo, NumberPicker } from '../UI'

class BuyTicket extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedNumbers: [],
      maxNumber: 60,
      numbersInTicket: 6
    }
    this.handleToggleNumber = this.handleToggleNumber.bind(this)
  }

  handleToggleNumber = n => {
    let { selectedNumbers, numbersInTicket } = this.state
    if(selectedNumbers.find(k => k === n)){
      this.setState({ selectedNumbers: selectedNumbers.filter(k => k !== n)})
    } else if(selectedNumbers.length < numbersInTicket){
      this.setState({ selectedNumbers: selectedNumbers.concat([n])})
    }
  }

  render() {
    let { selectedNumbers, maxNumber, numbersInTicket } = this.state
    return (
      <ScreenContainer>
        <BlockContainer>
            <Logo />
            <DrawingInfo id={743876} prize={30943123}/>
        </BlockContainer>
        <BlockContainer>
            <NumberPicker
              maxNumber={maxNumber}
              selectedNumbers={selectedNumbers}
              numbersInTicket={numbersInTicket}
              onToggle={this.handleToggleNumber}/>
        </BlockContainer>
      </ScreenContainer>
    )
  }
}

export default BuyTicket