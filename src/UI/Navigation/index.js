import React from 'react'
import './Navigation.css'

export default ({changeRoute, activeRoute}) => (
    <div className="Navigation">
        <button
            className={activeRoute === 'home' ? "active" : ""}
            onClick={_ => changeRoute('home')}>
            Home
        </button>
        <button 
            className={activeRoute === 'buy' ? "active" : ""}
            onClick={_ => changeRoute('buy')}>
            Buy Ticket
        </button>
    </div>
)