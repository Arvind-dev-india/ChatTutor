import { definePrefabKnowledge } from '@dsl/knowledge'

export default definePrefabKnowledge((utils) => {
  utils.name('trie')
  utils.description('A visual Trie (prefix tree) data structure for string operations. Supports word insertion, search, and prefix matching visualization.')
  
  utils.prop('words').describe('Array of words in the trie.').type('string[]').optional('[]')
  utils.prop('root').describe('Alternative: Root node object with children map and isEnd flag.').type('TrieNode').optional()
  utils.prop('highlight').describe('Array of characters/paths to highlight.').type('string[]').optional('[]')
  utils.prop('highlightColor').describe('Color for highlighted nodes.').type('string').optional('"warning"')
  utils.prop('searchWord').describe('Word being searched (highlights path).').type('string').optional()
  utils.prop('searchPrefix').describe('Prefix being searched (highlights matching prefix).').type('string').optional()
  utils.prop('insertWord').describe('Word being inserted (triggers insert animation).').type('string').optional()
  utils.prop('current').describe('Current node in traversal.').type('string').optional()
  utils.prop('currentColor').describe('Color for current node.').type('string').optional('"primary"')
  utils.prop('found').describe('Array of found words (for prefix search).').type('string[]').optional('[]')
  utils.prop('foundColor').describe('Color for found word end nodes.').type('string').optional('"success"')
  utils.prop('showEndMarkers').describe('Whether to show word-end markers.').type('boolean').optional('true')
  utils.prop('x').describe('X position of trie on canvas.').type('number').optional('0')
  utils.prop('y').describe('Y position of trie on canvas.').type('number').optional('0')
  utils.prop('nodeRadius').describe('Radius of trie nodes.').type('number').optional('20')
  utils.prop('levelHeight').describe('Vertical spacing between levels.').type('number').optional('60')
  utils.prop('label').describe('Label text above the trie.').type('string').optional()
})
