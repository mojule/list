'use strict'

const insertBefore = ({ api, state, Api }) => {
  const insertBefore = ( index, ...values ) => function*(){
    let i = 0
    for( let current of state() ){
      if( i === index )
        for( let value of values )
          yield value

      yield current

      i++
    }
  }

  api.insertBefore = ( index, ...values ) => Api( insertBefore( index, ...values ) )
}

module.exports = insertBefore
