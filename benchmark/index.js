'use strict'

const bench = require( 'fastbench' )
const List = require( '../src' )

const array = ( ...values ) => {
  const arr1 = values
  const arr2 = arr1.filter( n => n % 2 === 0 )
  const arr3 = arr2.map( n => n * n )
  const arr4 = arr1.concat( arr2 ).concat( arr3 )
  const arr5 = arr4.concat( ...arr1.entries() )
  const arr6 = [
    ...arr5,
    arr5.findIndex( n => n === 0 ),
    arr5.includes( 0 ) ? 0 : 1,
    arr5.indexOf( 0 ),
    ...arr5.keys(),
    arr5.length
  ]

  const arr7 = arr6.reduce( ( arr, n ) => {
    if( typeof n === 'number' )
      return arr.concat([ n ])
    else
      return arr.concat( n )
  }, [] )

  const arr8 = arr7.slice( 2, 10 )
  const arr9 = [ ...arr8, arr8.every( n => typeof n === 'number' ) ? 3 : 0 ]
  const arr10 = [ ...arr9, arr9.some( n => n === 0 ) ? 5 : 0 ]
  arr10.splice( 4, 0, ...values )

  return arr10
}

const list = ( ...values ) => {
  const list1 = List( values )
  const list2 = list1.filter( n => n % 2 === 0 )
  const list3 = list2.map( n => n * n )
  const list4 = list1.concat( list2 ).concat( list3 )
  const list5 = list4.concat( ...list1.entries() )
  const list6 = List(
    ...list5,
    list5.findIndex( n => n === 0 ),
    list5.includes( 0 ) ? 0 : 1,
    list5.indexOf( 0 ),
    ...list5.keys(),
    list5.length
  )

  const list7 = list6.reduce( ( list, n ) => {
    if( typeof n === 'number' )
      return list.append( n )
    else
      return list.concat( n )
  }, List() )

  const list8 = list7.slice( 2, 10 )
  const list9 = List( ...list8, list8.every( n => typeof n === 'number' ) ? 3 : 0 )
  const list10 = List( ...list9, list9.some( n => n === 0 ) ? 5 : 0 )
  const list11 = list10.insertBefore( 4, ...values )

  return list11
}

const random = () => Math.floor( Math.random() * 10 )

const getValues = ( n = 5 ) => {
  const values = []

  for( let i = 0; i < n; i++ )
    values.push( random() )

  return values
}

const values = getValues( 100 )

const run = bench([
  function asArray( done ){
    array( values )
    array( getValues( 100 ) )
    done()
  },
  function asList( done ){
    list( values )
    list( getValues( 100 ) )
    done()
  }
], 100 )

run()
