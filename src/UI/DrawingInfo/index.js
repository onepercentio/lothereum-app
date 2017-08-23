import React from 'react'
import moment from 'moment'
import './DrawingInfo.css'

export default ({ id, prize, drawingDate }) => (
    <div className="DrawingInfo">
        <p><b>Lottery</b> #{id}</p>
        <p><b>Prize</b> {prize} wei</p>
        <p><b>Drawing date</b> { moment(drawingDate).format('lll') }</p>
    </div>
)