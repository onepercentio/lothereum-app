import React from 'react'
import './DrawingInfo.css'

export default ({ id, prize }) => (
    <div className="DrawingInfo">
        <p><b>Drawing</b> #{id}</p>
        <p><b>Prize</b> {prize} wei</p>
    </div>
)