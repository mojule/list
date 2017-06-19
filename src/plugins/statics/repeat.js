'use strict'

const repeat = ({ statics, Api }) => {
  statics.repeat = ( value, count = 0 ) => Api( Array( count ).fill( value ) )
}

module.exports = repeat
