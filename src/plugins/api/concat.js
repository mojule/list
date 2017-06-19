'use strict'

const concat = ({ api, state, Api }) => {
  const concat = ( ...iterables ) => function*(){
    for( let current of state() )
      yield current

    for( let iter of iterables )
      for( let current of iter )
        yield current
  }

  api.concat = ( ...arrs ) => Api( concat( ...arrs ) )
}

module.exports = concat
