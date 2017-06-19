'use strict'

const entries = ({ api, state }) => {
  api.entries = function*(){
    let i = 0

    for( let current of state() ){
      yield [ i, current ]

      i++
    }
  }
}

module.exports = entries
