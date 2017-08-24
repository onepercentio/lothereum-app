import React from 'react'
import './Button.css'

export default ({ disabled, onClick, children }) => (
    <button
        className={`Button ${disabled ? 'disabled' : ''}`}
        disabled={disabled}
        onClick={onClick}>
        {children}
    </button>
)