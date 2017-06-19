'use strict'

const core = require( './core' )

const append = require( './api/append' )
const concat = require( './api/concat' )
const entries = require( './api/entries' )
const every = require( './api/every' )
const filter = require( './api/filter' )
const find = require( './api/find' )
const findIndex = require( './api/findIndex' )
const forEach = require( './api/forEach' )
const includes = require( './api/includes' )
const indexOf = require( './api/indexOf' )
const insertAfter = require( './api/insertAfter' )
const insertBefore = require( './api/insertBefore' )
const item = require( './api/item' )
const iterator = require( './api/iterator' )
const keys = require( './api/keys' )
const length = require( './api/length' )
const map = require( './api/map' )
const prepend = require( './api/map' )
const reduce = require( './api/reduce' )
const slice = require( './api/slice' )
const some = require( './api/some' )
const toArray = require( './api/toArray' )
const values = require( './api/values' )

const api = [
  append, concat, entries, every, filter, find, findIndex, forEach, includes,
  indexOf, insertAfter, insertBefore, item, iterator, keys, length, map,
  prepend, reduce, slice, some, toArray, values
]

const range = require( './statics/range' )
const repeat = require( './statics/repeat' )

const statics = [ range, repeat ]

module.exports = {
  core: [ core ], api, privates: [], statics
}