'use strict'

const some = ({ api, state }) => {
  api.some = predicate => {
    let i = 0

    for( let current of state() ){
      if( predicate( current, i ) )
        return true

      i++
    }

    return false
  }
}

module.exports = some
