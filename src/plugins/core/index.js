'use strict'

const is = require( '@mojule/is' )

const empty = () => [][ Symbol.iterator ]()

const core = ({ core, Api }) => {
  core.isState = value =>
    is.function( value ) && is.function( value()[ Symbol.iterator ] )

  core.createState = ( ...args ) => {
    if( args.length === 0 )
      return empty

    if( args.length === 1 ){
      const value = args[ 0 ]

      if( value[ Symbol.iterator ] )
        return () => value[ Symbol.iterator ]()

      if( is.function( value ) )
        return value

      if( is.number( value ) )
        return () => Array( value )[ Symbol.iterator ]()

      return
    }

    return () => Array( ...args )[ Symbol.iterator ]()
  }

  core.transformApi = api => {
    const proxy = new Proxy( api, {
      get: ( target, name ) => {
        if( name in target )
          return target[ name ]

        const index = parseInt( name, 10 )

        if( is.integer( index ) )
          return api.item( index )
      }
    })

    return proxy
  }
}

module.exports = core
