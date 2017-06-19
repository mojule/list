'use strict'

const findIndex = ({ api, state }) => {
  api.findIndex = predicate => {
    let i = 0

    for( let current of state() ){
      if( predicate( current, i ) )
        return i

      i++
    }

    return -1
  }
}

module.exports = findIndex
