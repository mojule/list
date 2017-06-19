'use strict'

const keys = ({ api, state }) => {
  api.keys = function*(){
    let i = 0

    for( let item of state() ){
      yield i

      i++
    }
  }
}

module.exports = keys
