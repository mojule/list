'use strict'

const append = ({ api, state, Api }) => {
  const append = ( ...values ) => function*(){
    for( let current of state() )
      yield current

    for( let value of values )
      yield value
  }

  api.append = ( ...values ) => Api( append( ...values ) )
}

module.exports = append
