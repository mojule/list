'use strict'

const every = ({ api, state }) => {
  api.every = predicate => {
    let i = 0

    for( let current of state() ){
      if( !predicate( current, i ) )
        return false

      i++
    }

    return true
  }
}

module.exports = every
