'use strict'

const length = ({ api, state }) => {
  Object.defineProperty( api, 'length', {
    get: () => Array.from( state() ).length
  })
}

module.exports = length
