import React, { Component } from 'react'
import './AccountBox.css'
import { QRCode, Input } from '../../UI'

const fromWei = n => n/1000000000000000000

export default class extends Component {
    constructor(props){
        super(props)
        this.state = {
            showEdit: false,
            showKey: false
        }
    }
    render() {
        let { address, destinationAddress, onChangeAddress, balance, privateKey, onRemove } = this.props
        let { showKey, showEdit } = this.state
        return (
        <div className="AccountContainer">
            <div className="AccountInfo"><b>Current account: </b> { address }</div>
            <div className="AccountInfo">
                <div onClick={_ => this.setState({ showEdit: !showEdit })}>
                    <b>Destination account (click to edit): </b>
                </div>
                { showEdit ? <Input value={ destinationAddress } onChange={ onChangeAddress }/> : destinationAddress || <i>not set</i>}
            </div>
            <div className="AccountInfo"><b>Private Key (click to show/hide):</b>
                <div onClick={_ => this.setState({ showKey: !showKey })}>
                    { showKey ? privateKey || '- -(empty)' : <i>***********</i> }
                </div>
            </div>
            <div className="AccountInfo"><b>Balance: </b> { fromWei(balance) } ether</div>
            <QRCode data={address} />
            <button onClick={ onRemove } >Remove account</button>
        </div>
        )
    }
}
