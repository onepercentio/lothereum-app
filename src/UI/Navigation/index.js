import React from 'react'
import './Navigation.css'

export default ({changeRoute, activeRoute, routes = []}) => (
    <div className="Navigation">
        { routes.map(r => (
            <button 
                key={r.name}
                className={activeRoute === r.name ? "active" : ""}
                onClick={_ => changeRoute({ route: r.name })}>
                { r.title }
            </button>))}
    </div>
)