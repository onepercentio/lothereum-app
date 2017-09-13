import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchBalance, setInfo, clearInfo, createRandom } from '../Redux/account'
import { ScreenContainer, BlockContainer, Logo, AccountBox, Button } from '../UI'

const mapStateToProps = ({ account }) => ({
  address: account.address,
  balance: account.balance,
  privateKey: account.privateKey
})

const mapDispatchToProps = dispatch => ({
  fetchBalance: _ => dispatch(fetchBalance()),
  setInfo: info => dispatch(setInfo(info)),
  clearInfo: _ => dispatch(clearInfo()),
  createRandom: _ => dispatch(createRandom())
})

class MyAccount extends Component {

  constructor(props) {
    super(props)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleCreate = () => this.props.createRandom()
  handleLogin = () => this.setState({ showLoginForm: true })
  handleRemove = () => this.props.clearInfo()

  render() {
    let { address, balance, privateKey } = this.props

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
            privateKey={privateKey}
            onRemove={this.handleRemove}/> :
            <BlockContainer>
              <BlockContainer>
                <Button onClick={this.handleCreate}>Create Account</Button>
              </BlockContainer>
            </BlockContainer>
          }
        </BlockContainer>
      </ScreenContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)
