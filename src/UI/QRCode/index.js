import React from 'react'
import './QRCode.css'
import qrcode from 'qrcode-js'

export default ({ data }) => (
    <div className="QRCodeContainer">
        <img src={`data:image/png;base64,${qrcode.toBase64(data, 4)}`}/>
    </div>
)
