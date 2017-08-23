import React from 'react'
import './TicketBox.css'

export default ({ tickets = [] }) => (
    <div className="TicketBox">
        { tickets.length === 0 ? (
            <p>
                <p>You have no tickets for this drawing.</p>
                <h2>Buy one now!</h2>
            </p>
        ) : null}
    </div>
)