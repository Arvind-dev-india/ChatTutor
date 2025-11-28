import { definePrefabKnowledge } from '@dsl/knowledge'

export default definePrefabKnowledge((utils) => {
  utils.name('hashtable')
  utils.description('A visual hash table data structure showing bucket array with collision handling. Supports chaining and open addressing visualization.')
  
  utils.prop('size').describe('Number of buckets in the hash table.').type('number')
  utils.prop('entries').describe('Array of key-value pairs: { key, value, hash? }.').type('{ key: string | number, value: any, hash?: number }[]').optional('[]')
  utils.prop('collisionStrategy').describe('How collisions are handled.').type('"chaining" | "linear" | "quadratic" | "double"').optional('"chaining"')
  utils.prop('highlightBuckets').describe('Array of bucket indices to highlight.').type('number[]').optional('[]')
  utils.prop('highlightColor').describe('Color for highlighted buckets.').type('string').optional('"warning"')
  utils.prop('currentKey').describe('Key currently being looked up or inserted.').type('string | number').optional()
  utils.prop('currentHash').describe('Hash value of current key (shown in animation).').type('number').optional()
  utils.prop('probePath').describe('Array of bucket indices visited during probing.').type('number[]').optional('[]')
  utils.prop('probeColor').describe('Color for probe path.').type('string').optional('"secondary"')
  utils.prop('showHashFormula').describe('Whether to show hash formula.').type('boolean').optional('true')
  utils.prop('showLoadFactor').describe('Whether to show load factor.').type('boolean').optional('true')
  utils.prop('x').describe('X position of hash table on canvas.').type('number').optional('0')
  utils.prop('y').describe('Y position of hash table on canvas.').type('number').optional('0')
  utils.prop('bucketWidth').describe('Width of each bucket cell.').type('number').optional('80')
  utils.prop('bucketHeight').describe('Height of each bucket cell.').type('number').optional('40')
  utils.prop('label').describe('Label text above the hash table.').type('string').optional()
})
