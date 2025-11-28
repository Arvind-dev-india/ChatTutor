import { definePrefabKnowledge } from '@dsl/knowledge'

export default definePrefabKnowledge((utils) => {
  utils.name('dscanvas')
  utils.description('A canvas container for data structure visualizations. Unlike the math plane, this canvas is optimized for discrete data structures without coordinate axes.')
  
  utils.prop('width').describe('Width of the canvas.').type('number').optional('800')
  utils.prop('height').describe('Height of the canvas.').type('number').optional('600')
  utils.prop('background').describe('Background color of the canvas.').type('string').optional('"transparent"')
  utils.prop('padding').describe('Padding around the content.').type('number').optional('20')
  utils.prop('title').describe('Title displayed at the top of the canvas.').type('string').optional()
  utils.prop('showGrid').describe('Whether to show a subtle grid for alignment.').type('boolean').optional('false')
  utils.prop('gridSize').describe('Size of grid cells if grid is shown.').type('number').optional('50')
  utils.prop('theme').describe('Color theme for the canvas.').type('"light" | "dark" | "auto"').optional('"auto"')
})
