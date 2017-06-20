# list

List factory - work in progress

Don't use `list` when your data is already in arrays - use list when you're
dealing with iterables/generators and want array-like comprehensions like
`filter`, `map`, `forEach`, `find`, `some` etc.

You can also use it as an immutable collection if that's your thing, all
functions return a new list rather than mutate an existing one.

`list` is not super performant inside hot code - V8 does not optimize generator
functions - use arrays if you need very high performance - code is somewhat
optimised but still slow compared to arrays. Further optimization is likely
possible, PRs welcome.

## Install

`npm install @mojule/list`

## Example

```javascript
```

## Notes (work in progress)

Creates "lists" from any underlying iterable

Live, if the underlying data source changes, so do any derived lists:

```javascript
const arr = [ 1, 2, 3 ]

const list = List( arr )

const filtered = list.filter( n => n % 2 === 0 )

console.log( Array.from( filtered ) ) // [ 2 ]

arr.push( 4 )

console.log( Array.from( filtered ) ) // [ 2, 4 ]
```

Can also be used to create new immutable lists:

```javascript
const list1 = List( 1, 2, 3 )
const list2 = List( 4, 5, 6 )
const list3 = list1.concat( list2 )
```