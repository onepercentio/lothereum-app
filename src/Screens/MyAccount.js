import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScreenContainer, BlockContainer, Logo, AccountBox } from '../UI'

const mapStateToProps = ({ account }) => ({
  address: account.address,
  balance: account.balance
})

class MyAccount extends Component {

  render() {
    let { address, balance } = this.props

    return (
      <ScreenContainer>
        <BlockContainer>
          <Logo />
        </BlockContainer>
        <BlockContainer>
          <AccountBox 
            address={address} 
            balance={balance}
            onRemove={() => {}}/>
        </BlockContainer>
      </ScreenContainer>
    )
  }
}

export default connect(mapStateToProps)(MyAccount)