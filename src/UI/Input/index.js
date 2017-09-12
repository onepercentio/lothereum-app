import React from 'react'
import './input.css'

export default ({ onChange, label, placeholder, secure = false }) =>
    <div className="InputContainer">
        <h4>{label}</h4>
        <input onChange={onChange} type={ secure ? 'password' : 'text'} placeholder={placeholder} />
    </div>
