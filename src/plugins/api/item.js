'use strict'

const item = ({ api, state }) => {
  api.item = index => {
    let i = 0

    for( let current of state() ){
      if( i === index ){
        return current
      }

      i++
    }
  }
}

module.exports = item
