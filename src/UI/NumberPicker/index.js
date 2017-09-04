import React, { Component } from 'react'
import './NumberPicker.css'

class NumberPicker extends Component {
  render() {
    let { maxDrawableNumber, onToggle, selectedNumbers } = this.props

    let noColumns = maxDrawableNumber % 6 === 0 ? 6 :
        maxDrawableNumber % 5 === 0 ? 5 :
        maxDrawableNumber % 4 === 0 ? 4 : 6

    let numbers = Array.apply(null, { length: maxDrawableNumber })
        .reduce((c, n, i) => {
            if(i % noColumns === 0){
                c.push([])
            }
            c[c.length - 1].push(i + 1)
            return c
        }, [])

    return (
      <div className="NumberPicker">
          { numbers.map((line, i) => (
              <div key={i} className="NumbersLine">
                  { line.map(n => (
                      <button
                        key={n}
                        onClick={_ => onToggle(n)}
                        className={`NumberItem ${selectedNumbers.indexOf(n) !== -1 ? 'ItemSelected' : ''}`}>
                        <h3>{n}</h3>
                      </button>
                  ))}
              </div>
          )) }
      </div>
    )
  }
}

export default NumberPicker
