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
import { connect } from 'react-redux'
import { setNumbers, buyTicket } from '../Redux/newTicket'
import { getNextLottery } from '../Redux/lotteries'

const mapStateToProps = ({ newTicket, lotteries }) => ({
  numbers: newTicket.numbers,
  lottery: getNextLottery(lotteries, { id: newTicket.id })
})

const mapDispatchToProps = dispatch => ({
  setNumbers: numbers => dispatch(setNumbers(numbers)),
  buyTicket: _ => dispatch(buyTicket())
})

class BuyTicket extends Component {
  constructor(props){
    super(props)
    this.state = {
      showPurchaseConfirmation: false
    }

    this.handleToggleNumber = this.handleToggleNumber.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePressRandom = this.handlePressRandom.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleConfirmPurchase = this.handleConfirmPurchase.bind(this)
  }

  handleToggleNumber = n => {
    let { numbers, lottery: { numbersPerTicket }, setNumbers } = this.props
    if(numbers.find(k => k === n)){
      setNumbers({ numbers: numbers.filter(k => k !== n)})
  } else if(numbers.length < numbersPerTicket){
      setNumbers({ numbers: numbers.concat([n])})
    }
  }

  handlePressRandom = _ => {
    let { lottery: { maxDrawableNumber, numbersPerTicket }, setNumbers } = this.props
    let numbers = [], n
    while(numbers.length < numbersPerTicket){
      n = Math.floor(Math.random() * maxDrawableNumber) + 1
      if(numbers.indexOf(n) === -1) numbers.push(n)
    }
    setNumbers({ numbers })
  }

  handleNext = _ => this.setState({ showPurchaseConfirmation: true })
  handleCancel = _ => this.setState({ showPurchaseConfirmation: false })
  handleConfirmPurchase = _ => this.props.buyTicket()

  componentDidMount = _ => this.props.setNumbers({ numbers: []})

  render() {
    let { showPurchaseConfirmation } = this.state
    let { numbers, lottery: { drawingIndex, prize, maxDrawableNumber, numbersPerTicket, nextDrawingDate }} = this.props
    return (
      <ScreenContainer>
        <BlockContainer>
            <Logo />
            <DrawingInfo id={drawingIndex} prize={prize} date={nextDrawingDate}/>
        </BlockContainer>
        { showPurchaseConfirmation ? (
          <ScreenContainer>
            <BlockContainer>
              <Ticket numbers={numbers}/>
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
                  maxDrawableNumber={maxDrawableNumber}
                  selectedNumbers={numbers}
                  numbersPerTicket={numbersPerTicket}
                  onToggle={this.handleToggleNumber}/>
            </BlockContainer>
            <BlockContainer>
              <Button
                onClick={ this.handlePressRandom }>Randomize</Button>
            </BlockContainer>
            <BlockContainer>
              <Button
                disabled={ numbers.length < numbersPerTicket }
                onClick={ this.handleNext }>Next</Button>
            </BlockContainer>
          </ScreenContainer>
        )}
      </ScreenContainer>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BuyTicket)
