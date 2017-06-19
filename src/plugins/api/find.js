'use strict'

const find = ({ api, state }) => {
  api.find = predicate => {
    let i = 0

    for( let current of state() ){
      if( predicate( current, i ) ){
        return current
      }

      i++
    }
  }
}

module.exports = find
