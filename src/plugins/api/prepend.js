'use strict'

const prepend = ({ api, state, Api }) => {
  const prepend = ( ...values ) => function*(){
    for( let value of values )
      yield value

    for( let current of state() )
      yield current
  }

  api.prepend = ( ...values ) => Api( prepend( ...values ) )
}

module.exports = prepend
