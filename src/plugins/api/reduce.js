'use strict'

const reduce = ({ api, state }) => {
  api.reduce = ( reducer, initialValue ) => {
    let value = initialValue
    let i = 0

    for( let item of state() ) {
      if( i === 0 && value === undefined ){
        value = item
      } else {
        value = reducer( value, item, i )
      }

      i++
    }

    return value
  }
}

module.exports = reduce
