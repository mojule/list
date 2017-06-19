'use strict'

const toArray = ({ api, state }) => {
  api.toArray = () => Array.from( state() )
}

module.exports = toArray
