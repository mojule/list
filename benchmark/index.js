'use strict'

const bench = require( 'fastbench' )
const List = require( '../src' )

const array = ( ...values ) => {
  const { length } = values
  const arr1 = []
  const arr2 = []

  for( let i = 0; i < length; i++ )
    arr1.push( values[ i ] )

  arr2.push( ...arr1.filter( n => n % 2 === 0 ) )

  const arr3 = arr2.map( n => n * n )
  const arr4 = arr1.concat( arr2 ).concat( arr3 )
  const arr5 = arr4.concat( ...arr1.entries() )

  arr5.push( arr5.findIndex( n => n === 0 ) )

  const arr6 = arr5.slice()

  arr5.forEach( ( value, i ) => {
    if( typeof value === 'number' )
      arr6.push( value * i )
  })

  if( arr6.includes( 0 ) )
    arr6.push( 5 )

  arr6.push( arr6.indexOf( 0 ) )
  arr6.push( ...arr6.keys() )
  arr6.push( arr6.length )

  const arr7 = arr6.reduce( ( arr, n ) => {
    if( typeof n === 'number' )
      arr.push( n )
    else
      arr.push( ...n )

    return arr
  }, [] )

  const arr8 = arr7.slice( 2, 10 )

  if( arr8.every( n => typeof n === 'number' ) )
    arr8.push( 3 )

  if( arr8.some( n => n === 0 ) )
    arr8.push( 5 )

  return arr8
}

const list = ( ...values ) => {
  const { length } = values
  let list1 = List()
  let list2 = List()

  for( let i = 0; i < length; i++ )
    list1 = list1.append( values[ i ] )

  list2 = list2.append( ...list1.filter( n => n % 2 === 0 ) )

  let list3 = list2.map( n => n * n )
  let list4 = list1.concat( list2 ).concat( list3 )
  let list5 = list4.concat( ...list1.entries() )

  list5 = list5.append( list5.findIndex( n => n === 0 ) )

  let list6 = list5.slice()

  list5.forEach( ( value, i ) => {
    if( typeof value === 'number' )
      list6 = list6.append( value * i )
  })

  if( list6.includes( 0 ) )
    list6 = list6.append( 5 )

  list6 = list6.append( list6.indexOf( 0 ) )
  list6 = list6.append( ...list6.keys() )
  list6 = list6.append( list6.length )

  let list7 = list6.reduce( ( list, n ) => {
    if( typeof n === 'number' )
      return list.append( n )
    else
      return list.append( ...n )
  }, List() )

  let list8 = list7.slice( 2, 10 )

  if( list8.every( n => typeof n === 'number' ) )
    list8 = list8.append( 3 )

  if( list8.some( n => n === 0 ) )
    list8 = list8.append( 5 )

  return list8
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
/*
const small = getValues( 5 )

console.log( array( small ) )
console.log( list( small ).toArray() )
*/