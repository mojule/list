'use strict'

const assert = require( 'assert' )
const List = require( '../' )
const pull = require( 'pull-stream' )

const ArrayGenerator = arr => function*(){
  const { length } = arr

  for( let i = 0; i < length; i++ )
    yield arr[ i ]
}

const testData = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

const pullStreamSource = ({ api, state }) => {
  api.source = () => {
    const iterator = state()

    const read = ( abort, cb ) => {
      const current = iterator.next()

      if( current.done || abort ) return cb( true )

      cb( null, current.value )
    }

    return read
  }
}

describe( 'List', () => {
  const generator = ArrayGenerator( testData )

  describe( 'Factory', () => {
    it( 'from generator', () => {
      assert.doesNotThrow( () => List( generator ) )
    })

    it( 'from iterable', () => {
      assert.doesNotThrow( () => List( testData ) )
      assert.doesNotThrow( () => List( 'from string' ) )
    })

    it( 'empty', () => {
      const list = List()

      assert.strictEqual( list.length, 0 )
    })

    it( 'from args', () => {
      const list = List( ...testData )

      assert.deepEqual( Array.from( list ), testData )
    })

    it( 'from size', () => {
      const list = List( 10 )

      assert.strictEqual( list.length, 10 )
    })

    it( 'invalid state', () => {
      assert.throws( () => List( () => 42 ) )
      assert.throws( () => List( false ) )
    })

    it( 'custom plugin', done => {
      const NewList = List.Factory( pullStreamSource )
      const list = NewList( generator )

      pull(
        list.source(),
        pull.collect( ( err, array ) => {
          assert.deepEqual( testData, array )
          done()
        })
      )
    })
  })

  describe( 'publics', () => {
    const list = List( generator )
    const predicate = ( n, i ) => n % 2 === 0 && i % 2 === 0
    const nothingPredicate = n => n === 10
    const bigPredicate = n => n > 4
    const transform = ( n, i ) => n * i
    const reducer = ( current, n, i ) => current + n * i

    it( 'append', () => {
      const expect = testData.concat( testData.map( transform ) )
      const result = Array.from( list.append( ...testData.map( transform ) ) )

      assert.deepEqual( expect, result )
    })

    it( 'concat', () => {
      const expect = testData.concat( testData, testData )
      const result = Array.from( list.concat( list, testData ) )

      assert.deepEqual( expect, result )
    })

    it( 'entries', () => {
      const expect = Array.from( testData.entries() )
      const result = Array.from( list.entries() )

      assert.deepEqual( expect, result )
    })

    it( 'every', () => {
      assert( list.every( n => n < 10 ) )
      assert( !list.every( n => n < 9 ) )
    })

    describe( 'filter', () => {
      it( 'filter', () => {
        const expect = testData.filter( predicate )
        const result = Array.from( list.filter( predicate ) )

        assert.deepEqual( expect, result )
      })

      it( 'chained filter', () => {
        const expect = testData.filter( predicate ).filter( bigPredicate )
        const result = Array.from(
          list.filter( predicate ).filter( bigPredicate )
        )

        assert.deepEqual( expect, result )
      })

      it( 'derived filter', () => {
        const source = [ 1, 2, 3 ]
        const list = List( source )
        const even = list.filter( n => n % 2 === 0 )

        assert.deepEqual( Array.from( even ), [ 2 ] )

        source.push( 4 )

        assert.deepEqual( Array.from( even ), [ 2, 4 ] )
      })
    })

    describe( 'find', () => {
      it( 'predicate', () => {
        const expect = testData.find( predicate )
        const result = list.find( predicate )

        assert.deepEqual( expect, result )
      })

      it( 'predicate with no match', () => {
        const expect = testData.find( nothingPredicate )
        const result = list.find( nothingPredicate )

        assert.deepEqual( expect, result )
      })
    })

    describe( 'findIndex', () => {
      it( 'predicate', () => {
        const expect = testData.findIndex( predicate )
        const result = list.findIndex( predicate )

        assert.deepEqual( expect, result )
      })

      it( 'predicate with no match', () => {
        const expect = testData.findIndex( nothingPredicate )
        const result = list.findIndex( nothingPredicate )

        assert.deepEqual( expect, result )
      })
    })

    it( 'forEach', () => {
      list.forEach( ( value, i ) => {
        assert.strictEqual( value, testData[ i ] )
        assert.strictEqual( value, i )
      })
    })

    describe( 'includes', () => {
      it( 'no fromIndex', () => {
        assert( list.includes( 5 ) )
        assert( !list.includes( 10 ) )
      })

      it( 'fromIndex', () => {
        assert( list.includes( 5, 4 ) )
        assert( !list.includes( 10, 4 ) )
      })

      it( 'negative fromIndex', () => {
        assert( list.includes( 9, -2 ) )
        assert( !list.includes( 10, -2 ) )
      })
    })

    describe( 'indexOf', () => {
      it( 'no fromIndex', () => {
        assert.strictEqual( list.indexOf( 5 ), 5 )
        assert.strictEqual( list.indexOf( 10 ), -1 )
      })

      it( 'fromIndex', () => {
        assert.strictEqual( list.indexOf( 5, 4 ), 5 )
        assert.strictEqual( list.indexOf( 10, 4 ), -1 )
      })

      it( 'negative fromIndex', () => {
        assert.strictEqual( list.indexOf( 9, -2 ), 9 )
        assert.strictEqual( list.indexOf( 10, -2 ), -1 )
      })
    })

    it( 'insertAfter', () => {
      assert.deepEqual(
        Array.from( list.insertAfter( 0, ...list.map( transform ) ) ),
        [ 0 ].concat( testData.map( transform ) ).concat( testData.slice( 1 ) )
      )
    })

    it( 'insertBefore', () => {
      assert.deepEqual(
        Array.from( list.insertBefore( 1, ...list.map( transform ) ) ),
        [ 0 ].concat( testData.map( transform ) ).concat( testData.slice( 1 ) )
      )
    })

    it( 'item', () => {
      assert.strictEqual( list.item( 5 ), 5 )
      assert.strictEqual( list.item( 10 ), undefined )
    })

    it( 'keys', () => {
      const expect = Array.from( testData.keys() )
      const result = Array.from( list.keys() )

      assert.deepEqual( expect, result )
    })

    it( 'length', () => {
      assert.strictEqual( testData.length, list.length )
    })

    it( 'map', () => {
      const expect = testData.map( transform )
      const result = Array.from( list.map( transform ) )

      assert.deepEqual( expect, result )
    })

    describe( 'reduce', () => {
      it( 'no initial value', () => {
        const expect = testData.reduce( reducer )
        const result = list.reduce( reducer )

        assert.strictEqual( expect, result )
      })

      it( 'initial value', () => {
        const expect = testData.reduce( reducer, 10 )
        const result = list.reduce( reducer, 10 )

        assert.strictEqual( expect, result )
      })
    })

    describe( 'slice', () => {
      it( 'normal', () => {
        const expect = testData.slice( 2, 5 )
        const result = Array.from( list.slice( 2, 5 ) )

        assert.deepEqual( expect, result )
      })

      it( 'args omitted', () => {
        const expect = testData.slice()
        const result = Array.from( list.slice() )

        assert.deepEqual( expect, result )
      })

      it( 'end omitted', () => {
        const expect = testData.slice( 2 )
        const result = Array.from( list.slice( 2 ) )

        assert.deepEqual( expect, result )
      })

      it( 'negative start', () => {
        const expect = testData.slice( -2 )
        const result = Array.from( list.slice( -2 ) )

        assert.deepEqual( expect, result )
      })

      it( 'negative end', () => {
        const expect = testData.slice( 2, -2 )
        const result = Array.from( list.slice( 2, -2 ) )

        assert.deepEqual( expect, result )
      })

      it( 'greater end', () => {
        const expect = testData.slice( 2, 100 )
        const result = Array.from( list.slice( 2, 100 ) )

        assert.deepEqual( expect, result )
      })
    })

    describe( 'some', () => {
      it( 'predicate', () => {
        const expect = testData.some( predicate )
        const result = list.some( predicate )

        assert.strictEqual( expect, result )
      })

      it( 'predicate with no match', () => {
        const expect = testData.some( nothingPredicate )
        const result = list.some( nothingPredicate )

        assert.strictEqual( expect, result )
      })
    })

    it( 'values', () => {
      const expect = testData
      const result = Array.from( list.values() )

      assert.deepEqual( expect, result )
    })

    describe( 'indexer', () => {
      it( 'integers', () => {
        const { length } = testData

        // test out of bounds as well
        for( let i = 0; i < length + 1; i++ )
          assert.strictEqual( testData[ i ], list[ i ] )
      })

      it( 'missing', () => {
        assert.strictEqual( testData.nope, list.nope )
      })

      function* generator(){
        yield 0
        yield 1
        yield 2
        yield 3
      }

      it( 'multiple instances from same generator', () => {
        const list1 = List( generator )
        const len1 = list1.length
        for( let i = 0; i < len1; i++ )
          assert.strictEqual( list1[ i ], i )

        const list2 = List( generator )
        const len2 = list2.length
        for( let i = 0; i < len2; i++ )
          assert.strictEqual( list2[ i ], i )
      })
    })

    describe( 'iterable', () => {
      it( 'to array', () => {
        assert.deepEqual( testData, Array.from( list ) )
      })

      it( 'for of', () => {
        const result = []

        for( let item of list )
          result.push( item )

        assert.deepEqual( testData, result )
      })
    })
  })

  describe( 'statics', () => {
    describe( 'repeat', () => {
      it( 'zero', () => {
        const list = List.repeat( 'a', 0 )

        assert.strictEqual( list.length, 0 )
      })

      it( 'non zero', () => {
        const list = List.repeat( 'a', 3 )

        assert.deepEqual( Array.from( list ), [ 'a', 'a', 'a' ] )
      })
    })

    describe( 'range', () => {
      it( 'size only', () => {
        const list = List.range( 10 )

        assert.deepEqual( Array.from( list ), testData )
      })

      it( 'start and end', () => {
        const list = List.range( 0, 10 )

        assert.deepEqual( Array.from( list ), testData )
      })

      it( 'start and end and step', () => {
        const list = List.range( 0, 10, 1 )

        assert.deepEqual( Array.from( list ), testData )
      })

      it( 'negative step', () => {
        const list = List.range( 9, -1, -1 )

        assert.deepEqual( Array.from( list ), testData.slice().reverse() )
      })

      it( 'negative, step omitted', () => {
        const list = List.range( 9, -1 )

        assert.deepEqual( Array.from( list ), testData.slice().reverse() )
      })
    })
  })
})