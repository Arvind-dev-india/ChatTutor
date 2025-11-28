import { definePrefabKnowledge } from '@dsl/knowledge'

export default definePrefabKnowledge((utils) => {
  utils.name('heap')
  utils.description('A visual heap/priority queue data structure shown as both tree and array. Supports heapify animations and extract operations.')
  
  utils.prop('data').describe('Array of values in the heap (array representation).').type('(number | string)[]')
  utils.prop('type').describe('Type of heap.').type('"min" | "max"').optional('"max"')
  utils.prop('showTree').describe('Whether to show tree visualization.').type('boolean').optional('true')
  utils.prop('showArray').describe('Whether to show array visualization.').type('boolean').optional('true')
  utils.prop('highlight').describe('Array of indices to highlight.').type('number[]').optional('[]')
  utils.prop('highlightColor').describe('Color for highlighted elements.').type('string').optional('"warning"')
  utils.prop('comparing').describe('Pair of indices being compared.').type('[number, number]').optional()
  utils.prop('swapping').describe('Pair of indices being swapped (triggers swap animation).').type('[number, number]').optional()
  utils.prop('siftingUp').describe('Index of element being sifted up.').type('number').optional()
  utils.prop('siftingDown').describe('Index of element being sifted down.').type('number').optional()
  utils.prop('inserting').describe('Value being inserted (triggers insert animation).').type('number | string').optional()
  utils.prop('extracting').describe('Whether extraction is happening (triggers extract animation).').type('boolean').optional('false')
  utils.prop('x').describe('X position of heap on canvas.').type('number').optional('0')
  utils.prop('y').describe('Y position of heap on canvas.').type('number').optional('0')
  utils.prop('nodeRadius').describe('Radius of tree nodes.').type('number').optional('25')
  utils.prop('cellWidth').describe('Width of array cells.').type('number').optional('40')
  utils.prop('label').describe('Label text above the heap.').type('string').optional()
})
