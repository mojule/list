# list

List factory - work in progress

NB - `list` is not suitable for use inside hot code - V8 does not optimize
generator functions - use arrays if you need very high performance

## Install

`npm install @mojule/list`

## Example

```javascript
```

## Notes (work in progress)

Creates "lists" from any underlying iterable

API is similar to array, eg filter, map reduce etc.

`filter`, `map` and `slice` return `list` instances

Live, if the underlying data source changes, so do any derived lists:

```javascript
const arr = [ 1, 2, 3 ]

const list = List( arr )

const filtered = list.filter( n => n % 2 === 0 )

console.log( Array.form( filtered ) ) // [ 2 ]

arr.push( 4 )

console.log( Array.form( filtered ) ) // [ 2, 4 ]
```

Can also be used to create new immutable lists:

```javascript
const list = List().append( 1, 2, 3 )


```