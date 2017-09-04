import React from 'react'
import './TicketBox.css'
import { Ticket } from '../../UI'

export default ({ tickets = [], onBuyOne }) => (
    <div className="TicketBox">
        { tickets.length === 0 ? (
            <div>
                <p>You have no tickets for this drawing.</p>
                <a className="BuyOne" onClick={onBuyOne}><h2>Buy one now!</h2></a>
            </div>
        ) : tickets.map(ticket => 
            <Ticket
              key={ticket.id}
              ticketId={ticket.id}
              numbers={ticket.numbers} />
        )}
    </div>
)