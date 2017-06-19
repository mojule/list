'use strict'

const values = ({ api, state }) => {
  api.values = function*(){
    for( let item of state() )
      yield item
  }
}

module.exports = values
