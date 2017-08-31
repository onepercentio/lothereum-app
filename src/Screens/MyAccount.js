import React, { Component } from 'react'
import { ScreenContainer, BlockContainer, Logo } from '../UI'

class MyAccount extends Component {

  render() {
    return (
      <ScreenContainer>
        <BlockContainer>
          <Logo />
        </BlockContainer>
        <BlockContainer>
        </BlockContainer>
      </ScreenContainer>
    )
  }
}

export default MyAccount