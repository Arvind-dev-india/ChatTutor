import { definePrefabKnowledge } from '@dsl/knowledge'

export default definePrefabKnowledge((utils) => {
  utils.name('queue')
  utils.description('A visual queue (FIFO) data structure showing elements in a horizontal line. Supports enqueue/dequeue animations and front/rear pointer visualization.')
  
  utils.prop('data').describe('Array of values in the queue (front to rear).').type('(number | string | object)[]')
  utils.prop('maxSize').describe('Maximum capacity of the queue.').type('number').optional()
  utils.prop('front').describe('Index of the front element.').type('number').optional('0')
  utils.prop('rear').describe('Index of the rear element.').type('number').optional()
  utils.prop('highlight').describe('Array of indices to highlight.').type('number[]').optional('[]')
  utils.prop('highlightColor').describe('Color for highlighted elements.').type('string').optional('"warning"')
  utils.prop('enqueueing').describe('Value being enqueued (triggers enqueue animation).').type('number | string').optional()
  utils.prop('dequeueing').describe('Whether a dequeue operation is happening (triggers dequeue animation).').type('boolean').optional('false')
  utils.prop('showPointers').describe('Whether to show FRONT and REAR pointers.').type('boolean').optional('true')
  utils.prop('showIndices').describe('Whether to show index numbers.').type('boolean').optional('false')
  utils.prop('circular').describe('Whether this is a circular queue.').type('boolean').optional('false')
  utils.prop('x').describe('X position of queue on canvas.').type('number').optional('0')
  utils.prop('y').describe('Y position of queue on canvas.').type('number').optional('0')
  utils.prop('cellWidth').describe('Width of each cell.').type('number').optional('50')
  utils.prop('cellHeight').describe('Height of each cell.').type('number').optional('50')
  utils.prop('label').describe('Label text above the queue.').type('string').optional()
})
