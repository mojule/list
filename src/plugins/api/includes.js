'use strict'

const includes = ({ api, state }) => {
  api.includes = ( target, fromIndex = 0 ) => {
    if( fromIndex < 0 )
      return Array.from( state() ).includes( target, fromIndex )

    let i = 0

    for( let current of state() ){
      if( i >= fromIndex && current === target )
        return true

      i++
    }

    return false
  }
}

module.exports = includes
