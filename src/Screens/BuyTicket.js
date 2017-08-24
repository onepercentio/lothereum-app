import React, { Component } from 'react'
import { 
  ScreenContainer, 
  BlockContainer, 
  Logo, 
  Button, 
  DrawingInfo, 
  NumberPicker,
  Ticket
} from '../UI'

class BuyTicket extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedNumbers: [],
      maxNumber: 60,
      numbersInTicket: 6,
      showPurchaseConfirmation: false
    }
    this.handleToggleNumber = this.handleToggleNumber.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePressRandom = this.handlePressRandom.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleConfirmPurchase = this.handleConfirmPurchase.bind(this)
  }

  handleToggleNumber = n => {
    let { selectedNumbers, numbersInTicket } = this.state
    if(selectedNumbers.find(k => k === n)){
      this.setState({ selectedNumbers: selectedNumbers.filter(k => k !== n)})
    } else if(selectedNumbers.length < numbersInTicket){
      this.setState({ selectedNumbers: selectedNumbers.concat([n])})
    }
  }

  handleNext = _ => {
    this.setState({
      selectedNumbers: this.state.selectedNumbers.sort((a,b) => a-b),
      showPurchaseConfirmation: true
    })
  }

  handlePressRandom = _ => {
    let { maxNumber, numbersInTicket } = this.state
    let randomizedNumbers = [], n
    while(randomizedNumbers.length < numbersInTicket){
      n = Math.floor(Math.random() * maxNumber) + 1
      if(randomizedNumbers.indexOf(n) === -1) randomizedNumbers.push(n)
    }
    this.setState({ selectedNumbers: randomizedNumbers })
  }

  handleCancel = _ => this.setState({ showPurchaseConfirmation: false })

  handleConfirmPurchase = _ => { 
    alert("Ticket purchased: #123456")
    this.setState({ showPurchaseConfirmation: false, selectedNumbers: [] })
  }

  render() {
    let { selectedNumbers, maxNumber, numbersInTicket, showPurchaseConfirmation } = this.state
    return (
      <ScreenContainer>
        <BlockContainer>
            <Logo />
            <DrawingInfo id={743876} prize={30943123}/>
        </BlockContainer>
        { showPurchaseConfirmation ? (
          <ScreenContainer>
            <BlockContainer>
              <Ticket numbers={selectedNumbers}/>
            </BlockContainer>
            <BlockContainer>
              <Button 
                  onClick={ this.handleConfirmPurchase }>OK</Button>
            </BlockContainer>
            <BlockContainer>
              <Button 
                  onClick={ this.handleCancel }>Not quite</Button>
            </BlockContainer>
          </ScreenContainer>
        ) : (
          <ScreenContainer>
            <BlockContainer>
                <NumberPicker
                  maxNumber={maxNumber}
                  selectedNumbers={selectedNumbers}
                  numbersInTicket={numbersInTicket}
                  onToggle={this.handleToggleNumber}/>
            </BlockContainer>
            <BlockContainer>
              <Button 
                onClick={ this.handlePressRandom }>Randomize</Button>
            </BlockContainer>
            <BlockContainer>
              <Button 
                disabled={ selectedNumbers.length < numbersInTicket } 
                onClick={ this.handleNext }>Next</Button>
            </BlockContainer>
          </ScreenContainer>
        )}
      </ScreenContainer>
    )
  }
}

export default BuyTicket