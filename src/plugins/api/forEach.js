'use strict'

const forEach = ({ api, state }) => {
  api.forEach = callback => {
    let i = 0

    for( let current of state() ){
      callback( current, i )

      i++
    }
  }
}

module.exports = forEach
