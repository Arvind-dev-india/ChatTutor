import { definePrefabKnowledge } from '@dsl/knowledge'

export default definePrefabKnowledge((utils) => {
  utils.name('array')
  utils.description('A visual array/list data structure that displays elements in indexed cells. Supports highlighting, pointers, and animations for algorithm visualization.')
  
  utils.prop('data').describe('Array of values to display. Can be numbers, strings, or objects.').type('(number | string | object)[]')
  utils.prop('highlight').describe('Array of indices to highlight with special color.').type('number[]').optional('[]')
  utils.prop('highlightColor').describe('Color for highlighted cells.').type('string').optional('"warning"')
  utils.prop('pointers').describe('Named pointers to specific indices. Object with pointer names as keys and indices as values.').type('Record<string, number>').optional('{}')
  utils.prop('pointerColors').describe('Colors for each pointer. Object with pointer names as keys and colors as values.').type('Record<string, string>').optional('{}')
  utils.prop('showIndices').describe('Whether to show index numbers below cells.').type('boolean').optional('true')
  utils.prop('cellWidth').describe('Width of each cell in pixels.').type('number').optional('50')
  utils.prop('cellHeight').describe('Height of each cell in pixels.').type('number').optional('50')
  utils.prop('x').describe('X position of the array on canvas.').type('number').optional('0')
  utils.prop('y').describe('Y position of the array on canvas.').type('number').optional('0')
  utils.prop('label').describe('Label text above the array.').type('string').optional()
  utils.prop('compareIndices').describe('Pair of indices being compared (for sorting animations).').type('[number, number]').optional()
  utils.prop('swapIndices').describe('Pair of indices being swapped (triggers swap animation).').type('[number, number]').optional()
  utils.prop('sorted').describe('Array of indices that are in their final sorted position.').type('number[]').optional('[]')
  utils.prop('sortedColor').describe('Color for cells in final sorted position.').type('string').optional('"success"')
})
