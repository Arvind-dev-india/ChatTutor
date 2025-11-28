# Tree DSL Element

## Overview

The `<tree>` element renders tree data structures including:
- Binary trees
- Binary search trees (BST)
- N-ary trees
- With traversal animations and node highlighting

## DSL Syntax

```xml
refs:
  root:
    value: 5
    left:
      value: 3
      left: { value: 1 }
      right: { value: 4 }
    right:
      value: 7
      left: { value: 6 }
      right: { value: 8 }
  currentNode: 5
  visitedNodes: []

<code-plane>
  <tree 
    :root="root"
    :current="currentNode"
    :visited="visitedNodes"
    :type="'binary'"
  />
</code-plane>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `root` | `TreeNode` | `null` | Root node of tree |
| `current` | `number \| string` | `null` | Currently active node value |
| `visited` | `(number \| string)[]` | `[]` | Visited nodes (green) |
| `highlighted` | `(number \| string)[]` | `[]` | Highlighted nodes (yellow) |
| `path` | `(number \| string)[]` | `[]` | Path to highlight (blue) |
| `type` | `'binary' \| 'bst' \| 'nary'` | `'binary'` | Tree type |
| `show-null` | `boolean` | `false` | Show null children |
| `show-levels` | `boolean` | `false` | Show level numbers |
| `layout` | `'standard' \| 'compact'` | `'standard'` | Layout algorithm |
| `node-radius` | `number` | `20` | Node circle radius |

## TreeNode Structure

```typescript
interface TreeNode {
  value: number | string
  left?: TreeNode | null
  right?: TreeNode | null
  children?: TreeNode[]  // For n-ary trees
}
```

## Example: Binary Tree Traversals

### Inorder Traversal (Left → Root → Right)

```xml
refs:
  root:
    value: 4
    left:
      value: 2
      left: { value: 1 }
      right: { value: 3 }
    right:
      value: 6
      left: { value: 5 }
      right: { value: 7 }
  current: null
  visited: []
  stack: []
  output: []

<code-plane title="Inorder Traversal">
  <tree 
    :root="root"
    :current="current"
    :visited="visited"
  />
  
  <div class="traversal-info">
    <label>Stack: [{{ stack.join(', ') }}]</label>
    <label>Output: [{{ output.join(', ') }}]</label>
  </div>
  
  <step-info>
    {{ current ? `Visiting node ${current}` : 'Starting traversal' }}
  </step-info>
</code-plane>
```

### Preorder Traversal (Root → Left → Right)

```xml
refs:
  root: { value: 1, left: { value: 2, left: { value: 4 }, right: { value: 5 } }, right: { value: 3 } }
  current: null
  visited: []

<code-plane title="Preorder Traversal">
  <tree :root="root" :current="current" :visited="visited" />
  <output-array :data="visited" label="Preorder:" />
</code-plane>
```

### Level Order (BFS)

```xml
refs:
  root: { value: 3, left: { value: 9 }, right: { value: 20, left: { value: 15 }, right: { value: 7 } } }
  queue: [3]
  currentLevel: 0
  visited: []

<code-plane title="Level Order Traversal (BFS)">
  <tree 
    :root="root"
    :highlighted="queue"
    :visited="visited"
    :show-levels="true"
  />
  
  <label>Queue: [{{ queue.join(', ') }}]</label>
  <label>Level {{ currentLevel }}: Processing...</label>
</code-plane>
```

## Example: Binary Search Tree Operations

### BST Search

```xml
refs:
  root:
    value: 8
    left:
      value: 3
      left: { value: 1 }
      right: { value: 6, left: { value: 4 }, right: { value: 7 } }
    right:
      value: 10
      right: { value: 14, left: { value: 13 } }
  target: 6
  path: []
  found: false

<code-plane title="BST Search">
  <tree 
    :root="root"
    type="bst"
    :path="path"
    :highlighted="found ? [target] : []"
  />
  
  <label>Searching for: {{ target }}</label>
  <label>Path taken: {{ path.join(' → ') }}</label>
  
  <annotation v-if="found" type="success">
    Found {{ target }}!
  </annotation>
</code-plane>
```

### BST Insert

```xml
refs:
  root: { value: 5, left: { value: 3 }, right: { value: 7 } }
  newValue: 4
  path: []
  inserted: false

<code-plane title="BST Insert">
  <tree 
    :root="root"
    type="bst"
    :path="path"
    :highlighted="inserted ? [newValue] : []"
  />
  
  <label>Inserting: {{ newValue }}</label>
  <step-info>
    {{ newValue }} {{ path.length > 0 ? (newValue < path[path.length-1] ? '< going left' : '> going right') : 'starting at root' }}
  </step-info>
</code-plane>
```

## Example: Lowest Common Ancestor

```xml
refs:
  root:
    value: 3
    left:
      value: 5
      left: { value: 6 }
      right: { value: 2, left: { value: 7 }, right: { value: 4 } }
    right:
      value: 1
      left: { value: 0 }
      right: { value: 8 }
  nodeP: 5
  nodeQ: 1
  pathP: [3, 5]
  pathQ: [3, 1]
  lca: 3

<code-plane title="Lowest Common Ancestor">
  <tree 
    :root="root"
    :highlighted="[nodeP, nodeQ]"
    :path="[...pathP, ...pathQ]"
  />
  
  <node-label :value="nodeP" color="#3b82f6">P</node-label>
  <node-label :value="nodeQ" color="#ef4444">Q</node-label>
  
  <annotation type="info">
    LCA of {{ nodeP }} and {{ nodeQ }} is {{ lca }}
  </annotation>
</code-plane>
```

## Example: Validate BST

```xml
refs:
  root:
    value: 5
    left: { value: 3, left: { value: 2 }, right: { value: 4 } }
    right: { value: 7, left: { value: 6 }, right: { value: 8 } }
  current: null
  minBound: -Infinity
  maxBound: Infinity
  isValid: true

<code-plane title="Validate BST">
  <tree 
    :root="root"
    type="bst"
    :current="current"
  />
  
  <bounds-display 
    :node="current" 
    :min="minBound" 
    :max="maxBound" 
  />
  
  <step-info>
    Checking node {{ current }}: must be in range ({{ minBound }}, {{ maxBound }})
  </step-info>
</code-plane>
```

## Tree Edge Highlighting

```xml
<tree 
  :root="root"
  :edge-highlights="[
    { from: 5, to: 3, color: '#3b82f6' },
    { from: 3, to: 1, color: '#3b82f6' }
  ]"
/>
```

## Styling

```css
.tree-node {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #6366f1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.tree-node.current {
  border-color: #ef4444;
  background: #fef2f2;
  animation: pulse 0.5s ease-in-out;
}

.tree-node.visited {
  border-color: #22c55e;
  background: #f0fdf4;
}

.tree-node.highlighted {
  border-color: #eab308;
  background: #fefce8;
}

.tree-node.path {
  border-color: #3b82f6;
  background: #eff6ff;
}

.tree-edge {
  stroke: #9ca3af;
  stroke-width: 2;
}

.tree-edge.highlighted {
  stroke: #3b82f6;
  stroke-width: 3;
}
```

## Vue Component Implementation

```vue
<!-- packages-dsl/programming/src/components/Tree.vue -->
<template>
  <svg :width="width" :height="height" class="tree-visualization">
    <!-- Edges first (behind nodes) -->
    <g class="edges">
      <line
        v-for="edge in edges"
        :key="`edge-${edge.from}-${edge.to}`"
        :x1="edge.x1"
        :y1="edge.y1"
        :x2="edge.x2"
        :y2="edge.y2"
        class="tree-edge"
        :class="{ highlighted: isEdgeHighlighted(edge) }"
      />
    </g>
    
    <!-- Nodes -->
    <g class="nodes">
      <g
        v-for="node in positionedNodes"
        :key="node.value"
        :transform="`translate(${node.x}, ${node.y})`"
      >
        <circle
          :r="nodeRadius"
          class="tree-node"
          :class="getNodeClass(node.value)"
        />
        <text
          text-anchor="middle"
          dominant-baseline="central"
          class="node-label"
        >
          {{ node.value }}
        </text>
      </g>
    </g>
    
    <!-- Level indicators -->
    <g v-if="showLevels" class="levels">
      <text
        v-for="level in levelCount"
        :key="`level-${level}`"
        :x="10"
        :y="levelY(level)"
        class="level-label"
      >
        L{{ level }}
      </text>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface TreeNode {
  value: number | string
  left?: TreeNode | null
  right?: TreeNode | null
  children?: TreeNode[]
}

interface Props {
  root: TreeNode | null
  current?: number | string | null
  visited?: (number | string)[]
  highlighted?: (number | string)[]
  path?: (number | string)[]
  type?: 'binary' | 'bst' | 'nary'
  showNull?: boolean
  showLevels?: boolean
  nodeRadius?: number
}

const props = withDefaults(defineProps<Props>(), {
  current: null,
  visited: () => [],
  highlighted: () => [],
  path: () => [],
  type: 'binary',
  showNull: false,
  showLevels: false,
  nodeRadius: 20
})

// Calculate node positions using standard tree layout algorithm
const positionedNodes = computed(() => {
  // Implementation: assign x,y coordinates to each node
  // based on level and horizontal position
})

const edges = computed(() => {
  // Generate edge coordinates from parent to children
})

const getNodeClass = (value: number | string) => {
  if (value === props.current) return 'current'
  if (props.visited.includes(value)) return 'visited'
  if (props.highlighted.includes(value)) return 'highlighted'
  if (props.path.includes(value)) return 'path'
  return ''
}
</script>
```
