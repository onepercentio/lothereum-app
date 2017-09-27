import React from 'react'
import './input.css'

const handleChange = func => event => func(event.target.value)

export default ({ onChange, label, placeholder, secure = false, value='' }) =>
    <div className="InputContainer">
        { label ? <h4>{label}</h4> : null }
        <input onChange={handleChange(onChange)} type={ secure ? 'password' : 'text'} placeholder={placeholder} value={value}/>
    </div>
