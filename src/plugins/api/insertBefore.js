'use strict'

const insertBefore = ({ api, state, Api }) => {
  const insertBefore = ( reference, ...values ) => function*(){
    for( let current of state() ){
      if( current === reference )
        for( let value of values )
          yield value

      yield current
    }
  }

  api.insertBefore = ( reference, ...values ) => Api( insertBefore( reference, ...values ) )
}

module.exports = insertBefore
