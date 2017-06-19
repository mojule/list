'use strict'

const iterator = ({ api, state }) => {
  api[ Symbol.iterator ] = state
}

module.exports = iterator
