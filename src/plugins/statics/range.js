'use strict'

const range = ({ statics, Api }) => {
  statics.range = ( start, end, step ) => {
    if( end === undefined ){
      end = start
      start = 0
    }

    if( !step )
      step = start < end ? 1 : -1

    let index = -1
    let length = Math.max( Math.ceil( ( end - start ) / step ), 0 )
    const result = Array( length )

    while( length-- ){
      result[ ++index ] = start
      start += step
    }

    return Api( result )
  }
}

module.exports = range
