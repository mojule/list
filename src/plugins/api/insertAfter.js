'use strict'

const insertAfter = ({ api, state, Api }) => {
  const insertAfter = ( index, ...values ) => function*(){
    let i = 0
    for( let current of state() ){
      yield current

      if( i === index )
        for( let value of values )
          yield value

      i++
    }
  }

  api.insertAfter = ( index, ...values ) => Api( insertAfter( index, ...values ) )
}

module.exports = insertAfter
