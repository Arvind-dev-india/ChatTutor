import { definePrefabKnowledge } from '@dsl/knowledge'

export default definePrefabKnowledge((utils) => {
  utils.name('stack')
  utils.description('A visual stack (LIFO) data structure showing elements stacked vertically. Supports push/pop animations and top pointer visualization.')
  
  utils.prop('data').describe('Array of values in the stack (bottom to top).').type('(number | string | object)[]')
  utils.prop('maxSize').describe('Maximum capacity of the stack.').type('number').optional()
  utils.prop('top').describe('Index of the top element (auto-calculated if not provided).').type('number').optional()
  utils.prop('highlight').describe('Array of indices to highlight.').type('number[]').optional('[]')
  utils.prop('highlightColor').describe('Color for highlighted elements.').type('string').optional('"warning"')
  utils.prop('pushing').describe('Value being pushed (triggers push animation).').type('number | string').optional()
  utils.prop('popping').describe('Whether a pop operation is happening (triggers pop animation).').type('boolean').optional('false')
  utils.prop('showTop').describe('Whether to show TOP pointer.').type('boolean').optional('true')
  utils.prop('showIndices').describe('Whether to show index numbers.').type('boolean').optional('false')
  utils.prop('x').describe('X position of stack on canvas.').type('number').optional('0')
  utils.prop('y').describe('Y position of stack on canvas.').type('number').optional('0')
  utils.prop('cellWidth').describe('Width of each cell.').type('number').optional('60')
  utils.prop('cellHeight').describe('Height of each cell.').type('number').optional('40')
  utils.prop('label').describe('Label text above the stack.').type('string').optional()
})
