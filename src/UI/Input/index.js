import React from 'react'
import './input.css'

export default ({ onChange, label, placeholder }) =>
    <div className="InputContainer">
        <h4>{label}</h4>
        <input onChange={onChange} placeholder={placeholder} />
    </div>
