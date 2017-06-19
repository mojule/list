'use strict'

const slice = ({ api, state, Api }) => {
  const slice = ( begin, end ) => function*(){
    if( begin < 0 || end < 0 ){
      for( let current of Array.from( state() ).slice( begin, end ) )
        yield current
    } else {
      let i = 0

      for( let current of state() ){
        if( i >= begin && i < end )
          yield current

        i++
      }
    }
  }

  api.slice = ( begin = 0, end = Number.MAX_SAFE_INTEGER ) =>
    Api( slice( begin, end ) )
}

module.exports = slice
