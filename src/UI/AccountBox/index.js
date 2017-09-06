import React, { Component } from 'react'
import './AccountBox.css'
import { QRCode } from '../../UI'

const fromWei = n => n/1000000000000000000

export default class extends Component {
    constructor(props){
        super(props)
        this.state = {
            showKey: false
        }
    }
    render() {
        let { address, balance, privateKey, onRemove } = this.props
        let { showKey } = this.state
        return (
        <div className="AccountContainer">
            <div className="AccountInfo"><b>Current account: </b> { address }</div>
            <div className="AccountInfo"><b>Password (click to show/hide):</b>
                <div onClick={_ => this.setState({ showKey: !showKey })}>
                    { showKey ? privateKey : <i>***********</i> }
                </div>
            </div>
            <div className="AccountInfo"><b>Balance: </b> { fromWei(balance) } ether</div>
            <QRCode data={address} />
            <button onClick={ onRemove } >Remove account</button>
        </div>
        )
    }
}
