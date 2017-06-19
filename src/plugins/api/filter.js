'use strict'

const filter = ({ api, state, Api }) => {
  const filter = predicate => function*(){
    let i = 0

    for( let current of state() ){
      if( predicate( current, i ) )
        yield current

      i++
    }
  }

  api.filter = predicate => Api( filter( predicate ) )
}

module.exports = filter
