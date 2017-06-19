'use strict'

const map = ({ api, state, Api }) => {
  const map = transform => function*(){
    let i = 0

    for( let current of state() ){
      yield transform( current, i )

      i++
    }
  }

  api.map = transform => Api( map( transform ) )
}

module.exports = map
