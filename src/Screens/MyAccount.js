import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScreenContainer, BlockContainer, Logo, AccountBox, Button } from '../UI'

const mapStateToProps = ({ account }) => ({
  address: account.address,
  balance: account.balance
})

class MyAccount extends Component {

  constructor(props) {
    super(props)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleCreate = () => alert('create account')
  handleLogin = () => alert('login bro')
  handleRemove = () => alert('remove account')

  render() {
    let { address, balance } = this.props

    return (
      <ScreenContainer>
        <BlockContainer>
          <Logo />
        </BlockContainer>
        <BlockContainer>
          { address ?
          <AccountBox 
            address={address} 
            balance={balance}
            onRemove={this.handleRemove}/> :
            <BlockContainer>
              <BlockContainer>
                <Button onClick={this.handleCreate}>Create Account</Button>
              </BlockContainer>
              <BlockContainer>
                <Button onClick={this.handleLogin}>Login</Button>
              </BlockContainer>
            </BlockContainer>
          }
        </BlockContainer>
      </ScreenContainer>
    )
  }
}

export default connect(mapStateToProps)(MyAccount)