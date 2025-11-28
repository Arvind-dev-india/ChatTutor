import { definePrefabKnowledge } from '@dsl/knowledge'

export default definePrefabKnowledge((utils) => {
  utils.name('codeblock')
  utils.description('A visual code block with syntax highlighting and line-by-line execution visualization. Supports multiple programming languages and step-through animation.')
  
  utils.prop('code').describe('The source code to display.').type('string')
  utils.prop('language').describe('Programming language for syntax highlighting.').type('"python" | "javascript" | "typescript" | "java" | "cpp" | "c" | "go" | "rust"').optional('"python"')
  utils.prop('highlightLines').describe('Array of line numbers to highlight.').type('number[]').optional('[]')
  utils.prop('highlightColor').describe('Color for highlighted lines.').type('string').optional('"warning"')
  utils.prop('currentLine').describe('Currently executing line number.').type('number').optional()
  utils.prop('currentColor').describe('Color for current line.').type('string').optional('"primary"')
  utils.prop('breakpoints').describe('Array of line numbers with breakpoints.').type('number[]').optional('[]')
  utils.prop('executedLines').describe('Array of line numbers that have been executed.').type('number[]').optional('[]')
  utils.prop('executedColor').describe('Color for executed lines.').type('string').optional('"secondary"')
  utils.prop('variables').describe('Current variable values to display in sidebar.').type('Record<string, any>').optional('{}')
  utils.prop('showLineNumbers').describe('Whether to show line numbers.').type('boolean').optional('true')
  utils.prop('showVariables').describe('Whether to show variable sidebar.').type('boolean').optional('true')
  utils.prop('x').describe('X position of code block on canvas.').type('number').optional('0')
  utils.prop('y').describe('Y position of code block on canvas.').type('number').optional('0')
  utils.prop('width').describe('Width of code block.').type('number').optional('400')
  utils.prop('fontSize').describe('Font size for code.').type('number').optional('14')
  utils.prop('label').describe('Label text above the code block.').type('string').optional()
})
