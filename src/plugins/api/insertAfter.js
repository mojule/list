'use strict'

const insertAfter = ({ api, state, Api }) => {
  const insertAfter = ( reference, ...values ) => function*(){
    for( let current of state() ){
      yield current

      if( current === reference )
        for( let value of values )
          yield value
    }
  }

  api.insertAfter = ( reference, ...values ) => Api( insertAfter( reference, ...values ) )
}

module.exports = insertAfter
