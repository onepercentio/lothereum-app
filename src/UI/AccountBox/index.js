import React from 'react'
import './AccountBox.css'

export default ({ address, balance, onRemove }) => (
    <div className="AccountContainer">
        <div className="AccountInfo"><b>Current account: </b> { address }</div>
        <div className="AccountInfo"><b>Balance: </b> { balance } ether</div>
        <button onClick={ onRemove } >Remove account</button>
    </div>
)