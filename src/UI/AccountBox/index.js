import React from 'react'
import './AccountBox.css'

const fromWei = n => n/1000000000000000000

export default ({ address, balance, onRemove }) => (
    <div className="AccountContainer">
        <div className="AccountInfo"><b>Current account: </b> { address }</div>
        <div className="AccountInfo"><b>Balance: </b> { fromWei(balance) } ether</div>
        <button onClick={ onRemove } >Remove account</button>
    </div>
)
