import React from 'react'
import './Ticket.css'

export default ({ ticketId, numbers }) => (
    <div className="TicketContainer">
        <div className="TicketId">Ticket #{ticketId}</div>
        <div className="Numbers">{numbers.map(n => (<h3>{n}</h3>))}</div>
    </div>
)