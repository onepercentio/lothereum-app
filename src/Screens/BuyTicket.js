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
    let { numbers, lottery: { numbersInTicket }, setNumbers } = this.props
    if(numbers.find(k => k === n)){
      setNumbers({ numbers: numbers.filter(k => k !== n)})
    } else if(numbers.length < numbersInTicket){
      setNumbers({ numbers: numbers.concat([n])})
    }
  }

  handlePressRandom = _ => {
    let { lottery: { maxNumber, numbersInTicket }, setNumbers } = this.props
    let numbers = [], n
    while(numbers.length < numbersInTicket){
      n = Math.floor(Math.random() * maxNumber) + 1
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
    let { numbers, lottery: { id, prize, maxNumber, numbersInTicket }} = this.props
    return (
      <ScreenContainer>
        <BlockContainer>
            <Logo />
            <DrawingInfo id={id} prize={prize}/>
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
                  maxNumber={maxNumber}
                  selectedNumbers={numbers}
                  numbersInTicket={numbersInTicket}
                  onToggle={this.handleToggleNumber}/>
            </BlockContainer>
            <BlockContainer>
              <Button 
                onClick={ this.handlePressRandom }>Randomize</Button>
            </BlockContainer>
            <BlockContainer>
              <Button 
                disabled={ numbers.length < numbersInTicket } 
                onClick={ this.handleNext }>Next</Button>
            </BlockContainer>
          </ScreenContainer>
        )}
      </ScreenContainer>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BuyTicket)