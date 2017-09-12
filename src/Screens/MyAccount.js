import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchBalance, setInfo, clearInfo, createRandom } from '../Redux/account'
import { ScreenContainer, BlockContainer, Logo, AccountBox, Button, Input } from '../UI'

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
    this.state = {
      showLoginForm: false,
      formAddress: '',
      formKey: ''
    }

    this.handleCreate = this.handleCreate.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleCreate = () => {
      this.props.createRandom()
    //   this.props.setInfo({ address: '0x1802Dd945a19E6cA15a3C7B55A3CB566615faF73', privateKey: '9876543210'})
  }
  handleLogin = () => this.setState({ showLoginForm: true })
  handleRemove = () => this.props.clearInfo()
  handleFormChange = (info) => this.setState(info)
  handleFormSubmit = _ => {
    this.props.setInfo({ address: this.state.formAddress, privateKey: this.state.formKey })
    this.setState({ showLoginForm: false })
  }

  render() {
    let { address, balance, privateKey } = this.props
    let { showLoginForm } = this.state

    return (
      <ScreenContainer>
        <BlockContainer>
          <Logo />
        </BlockContainer>
        <BlockContainer>
          { showLoginForm ?
          <BlockContainer>
            <BlockContainer>
              <Input label='Address' placeholder='Your address' onChange={({ target: { value: formAddress }}) => this.handleFormChange({ formAddress })}/>
              <Input label='Password' secure placeholder='Your password' onChange={({ target: { value: formKey }}) => this.handleFormChange({ formKey })}/>
            </BlockContainer>
            <Button onClick={this.handleFormSubmit}>Login</Button>
          </BlockContainer> :
            address ?
          <AccountBox
            address={address}
            balance={balance}
            privateKey={privateKey}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)
