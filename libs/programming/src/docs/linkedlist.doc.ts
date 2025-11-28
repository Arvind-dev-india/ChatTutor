import { definePrefabKnowledge } from '@dsl/knowledge'

export default definePrefabKnowledge((utils) => {
  utils.name('linkedlist')
  utils.description('A visual linked list data structure showing nodes connected by arrows. Supports singly and doubly linked lists, cycle detection, and pointer visualization.')
  
  utils.prop('nodes').describe('Array of node values in the linked list.').type('(number | string | object)[]')
  utils.prop('type').describe('Type of linked list.').type('"singly" | "doubly"').optional('"singly"')
  utils.prop('head').describe('Index of the head node (for highlighting).').type('number').optional('0')
  utils.prop('tail').describe('Index of the tail node (for highlighting).').type('number').optional()
  utils.prop('current').describe('Index of currently active/visited node.').type('number').optional()
  utils.prop('currentColor').describe('Color for the current node.').type('string').optional('"warning"')
  utils.prop('pointers').describe('Named pointers to specific nodes. Object with pointer names as keys and node indices as values.').type('Record<string, number>').optional('{}')
  utils.prop('pointerColors').describe('Colors for each pointer.').type('Record<string, string>').optional('{}')
  utils.prop('cycleAt').describe('Index where cycle connects back to (for cycle detection visualization).').type('number').optional()
  utils.prop('visited').describe('Array of visited node indices.').type('number[]').optional('[]')
  utils.prop('visitedColor').describe('Color for visited nodes.').type('string').optional('"secondary"')
  utils.prop('x').describe('X position of the linked list on canvas.').type('number').optional('0')
  utils.prop('y').describe('Y position of the linked list on canvas.').type('number').optional('0')
  utils.prop('nodeSpacing').describe('Horizontal spacing between nodes.').type('number').optional('100')
  utils.prop('label').describe('Label text above the linked list.').type('string').optional()
  utils.prop('showNull').describe('Whether to show NULL at the end.').type('boolean').optional('true')
})
