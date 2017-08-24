import React, { Component } from 'react'
import './NumberPicker.css'

class NumberPicker extends Component {
  render() {
    let { maxNumber, onToggle, selectedNumbers } = this.props

    let noColumns = maxNumber % 6 === 0 ? 6 :
        maxNumber % 5 === 0 ? 5 :
        maxNumber % 4 === 0 ? 4 : 6

    let numbers = Array.apply(null, { length: maxNumber })
        .reduce((c, n, i) => {
            if(i % noColumns === 0){
                c.push([])
            }
            c[c.length - 1].push(i + 1)
            return c
        }, [])

    return (
      <div className="NumberPicker">
          { numbers.map(line => (
              <div className="NumbersLine">
                  { line.map(n => (
                      <button
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