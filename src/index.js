'use strict'

const ApiFactory = require( '@mojule/api-factory' )
const plugins = require( './plugins' )

const List = ApiFactory( plugins )

module.exports = List
