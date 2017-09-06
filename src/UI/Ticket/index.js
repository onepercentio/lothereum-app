import React from 'react'
import './Ticket.css'

export default ({ ticketId, numbers, processing }) => (
    <div className="TicketContainer">
        { processing ? <div className="TicketId">Processing ticket ...</div> : null }
        { ticketId ? <div className="TicketId">Ticket #{ticketId}</div> : null }
        <div className="Numbers">{numbers.map((n, i) => (<h3 key={i}>{n}</h3>))}</div>
    </div>
)