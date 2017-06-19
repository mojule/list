'use strict'

const indexOf = ({ api, state }) => {
  api.indexOf = ( target, fromIndex = 0 ) => {
    if( fromIndex < 0 )
      return Array.from( state() ).indexOf( target, fromIndex )

    let i = 0

    for( let current of state() ){
      if( i >= fromIndex && current === target )
        return i

      i++
    }

    return -1
  }
}

module.exports = indexOf
