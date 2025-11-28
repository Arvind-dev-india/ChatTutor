# Graph DSL Element

## Overview

The `<graph>` element renders graph data structures including:
- Directed and undirected graphs
- Weighted edges
- BFS/DFS traversal animations
- Shortest path highlighting

## DSL Syntax

```xml
refs:
  nodes:
    - { id: 0, label: 'A' }
    - { id: 1, label: 'B' }
    - { id: 2, label: 'C' }
    - { id: 3, label: 'D' }
  edges:
    - { from: 0, to: 1, weight: 4 }
    - { from: 0, to: 2, weight: 2 }
    - { from: 1, to: 3, weight: 3 }
    - { from: 2, to: 3, weight: 1 }
  visited: []
  current: null

<code-plane>
  <graph 
    :nodes="nodes"
    :edges="edges"
    :visited="visited"
    :current="current"
    :directed="true"
    :weighted="true"
  />
</code-plane>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `nodes` | `GraphNode[]` | `[]` | Node definitions |
| `edges` | `GraphEdge[]` | `[]` | Edge definitions |
| `visited` | `(string \| number)[]` | `[]` | Visited nodes |
| `current` | `string \| number` | `null` | Current node |
| `queue` | `(string \| number)[]` | `[]` | Nodes in queue (BFS) |
| `stack` | `(string \| number)[]` | `[]` | Nodes in stack (DFS) |
| `path` | `(string \| number)[]` | `[]` | Path to highlight |
| `directed` | `boolean` | `false` | Show arrow heads |
| `weighted` | `boolean` | `false` | Show edge weights |
| `layout` | `'force' \| 'circular' \| 'grid' \| 'tree'` | `'force'` | Layout algorithm |

## Node Structure

```typescript
interface GraphNode {
  id: string | number
  label?: string
  x?: number  // Optional fixed position
  y?: number
  color?: string
}
```

## Edge Structure

```typescript
interface GraphEdge {
  from: string | number
  to: string | number
  weight?: number
  label?: string
  color?: string
  style?: 'solid' | 'dashed'
}
```

## Example: BFS Traversal

```xml
refs:
  nodes:
    - { id: 0, label: 'A' }
    - { id: 1, label: 'B' }
    - { id: 2, label: 'C' }
    - { id: 3, label: 'D' }
    - { id: 4, label: 'E' }
    - { id: 5, label: 'F' }
  edges:
    - { from: 0, to: 1 }
    - { from: 0, to: 2 }
    - { from: 1, to: 3 }
    - { from: 1, to: 4 }
    - { from: 2, to: 4 }
    - { from: 2, to: 5 }
  visited: []
  queue: [0]
  current: null

<code-plane title="Breadth-First Search">
  <graph 
    :nodes="nodes"
    :edges="edges"
    :visited="visited"
    :queue="queue"
    :current="current"
    layout="tree"
  />
  
  <data-structure-view type="queue" :data="queue" label="Queue" />
  
  <step-info>
    {{ current !== null ? `Visiting node ${current}` : 'Starting BFS from node 0' }}
  </step-info>
</code-plane>
```

## Example: DFS Traversal

```xml
refs:
  nodes:
    - { id: 0, label: '0' }
    - { id: 1, label: '1' }
    - { id: 2, label: '2' }
    - { id: 3, label: '3' }
  edges:
    - { from: 0, to: 1 }
    - { from: 0, to: 2 }
    - { from: 1, to: 2 }
    - { from: 2, to: 0 }
    - { from: 2, to: 3 }
    - { from: 3, to: 3 }
  visited: []
  stack: [0]
  current: null
  recursionStack: []

<code-plane title="Depth-First Search">
  <graph 
    :nodes="nodes"
    :edges="edges"
    :visited="visited"
    :current="current"
    :directed="true"
  />
  
  <data-structure-view type="stack" :data="stack" label="Call Stack" />
  
  <label>Visited Order: {{ visited.join(' → ') }}</label>
</code-plane>
```

## Example: Dijkstra's Shortest Path

```xml
refs:
  nodes:
    - { id: 'A' }
    - { id: 'B' }
    - { id: 'C' }
    - { id: 'D' }
    - { id: 'E' }
  edges:
    - { from: 'A', to: 'B', weight: 4 }
    - { from: 'A', to: 'C', weight: 2 }
    - { from: 'B', to: 'C', weight: 1 }
    - { from: 'B', to: 'D', weight: 5 }
    - { from: 'C', to: 'D', weight: 8 }
    - { from: 'C', to: 'E', weight: 10 }
    - { from: 'D', to: 'E', weight: 2 }
  distances: { A: 0, B: Infinity, C: Infinity, D: Infinity, E: Infinity }
  visited: []
  current: null
  shortestPath: []

<code-plane title="Dijkstra's Algorithm">
  <graph 
    :nodes="nodes"
    :edges="edges"
    :visited="visited"
    :current="current"
    :path="shortestPath"
    :weighted="true"
    layout="circular"
  />
  
  <distance-table :distances="distances" />
  
  <priority-queue :data="unvisitedNodes" />
  
  <step-info>
    Processing node {{ current }} with distance {{ distances[current] }}
  </step-info>
</code-plane>
```

## Example: Topological Sort

```xml
refs:
  nodes:
    - { id: 0, label: 'Course A' }
    - { id: 1, label: 'Course B' }
    - { id: 2, label: 'Course C' }
    - { id: 3, label: 'Course D' }
    - { id: 4, label: 'Course E' }
  edges:
    - { from: 0, to: 2 }
    - { from: 1, to: 2 }
    - { from: 2, to: 3 }
    - { from: 2, to: 4 }
  inDegree: { 0: 0, 1: 0, 2: 2, 3: 1, 4: 1 }
  queue: []
  result: []

<code-plane title="Topological Sort (Kahn's Algorithm)">
  <graph 
    :nodes="nodes"
    :edges="edges"
    :queue="queue"
    :visited="result"
    :directed="true"
    layout="tree"
  />
  
  <in-degree-table :data="inDegree" />
  
  <label>Topological Order: {{ result.map(n => nodes[n].label).join(' → ') }}</label>
</code-plane>
```

## Example: Detect Cycle (Union-Find)

```xml
refs:
  nodes:
    - { id: 0 }
    - { id: 1 }
    - { id: 2 }
    - { id: 3 }
  edges:
    - { from: 0, to: 1 }
    - { from: 1, to: 2 }
    - { from: 2, to: 3 }
    - { from: 3, to: 0 }
  parent: [0, 1, 2, 3]
  rank: [0, 0, 0, 0]
  currentEdge: null
  cycleDetected: false

<code-plane title="Cycle Detection (Union-Find)">
  <graph 
    :nodes="nodes"
    :edges="edges"
    :highlighted-edge="currentEdge"
  />
  
  <union-find-view :parent="parent" :rank="rank" />
  
  <step-info>
    Processing edge {{ currentEdge?.from }} → {{ currentEdge?.to }}
    {{ cycleDetected ? '⚠️ Cycle detected!' : '' }}
  </step-info>
</code-plane>
```

## Example: Minimum Spanning Tree (Kruskal's)

```xml
refs:
  nodes:
    - { id: 0, label: 'A' }
    - { id: 1, label: 'B' }
    - { id: 2, label: 'C' }
    - { id: 3, label: 'D' }
  edges:
    - { from: 0, to: 1, weight: 10 }
    - { from: 0, to: 2, weight: 6 }
    - { from: 0, to: 3, weight: 5 }
    - { from: 1, to: 3, weight: 15 }
    - { from: 2, to: 3, weight: 4 }
  sortedEdges: []
  mstEdges: []
  currentEdge: null
  totalWeight: 0

<code-plane title="Kruskal's MST Algorithm">
  <graph 
    :nodes="nodes"
    :edges="edges"
    :mst-edges="mstEdges"
    :current-edge="currentEdge"
    :weighted="true"
  />
  
  <edge-list :edges="sortedEdges" :current="currentEdge" :included="mstEdges" />
  
  <label>MST Weight: {{ totalWeight }}</label>
</code-plane>
```

## Layout Options

### Force-Directed (Default)
Natural-looking layout using physics simulation.

### Circular
Nodes arranged in a circle - good for showing connectivity.

### Grid
Nodes in a grid pattern - good for matrix-based problems.

### Tree
Hierarchical layout - good for DAGs and tree-like structures.

```xml
<graph :nodes="nodes" :edges="edges" layout="circular" />
```

## Styling

```css
.graph-node {
  r: 20px;
  fill: white;
  stroke: #6366f1;
  stroke-width: 2px;
}

.graph-node.visited {
  fill: #f0fdf4;
  stroke: #22c55e;
}

.graph-node.current {
  fill: #fef2f2;
  stroke: #ef4444;
  animation: pulse 0.5s ease-in-out;
}

.graph-node.in-queue {
  fill: #eff6ff;
  stroke: #3b82f6;
}

.graph-edge {
  stroke: #9ca3af;
  stroke-width: 2px;
}

.graph-edge.visited {
  stroke: #22c55e;
  stroke-width: 3px;
}

.graph-edge.path {
  stroke: #3b82f6;
  stroke-width: 3px;
}

.graph-edge.mst {
  stroke: #8b5cf6;
  stroke-width: 4px;
}

.edge-weight {
  font-size: 12px;
  fill: #4b5563;
}
```

## Vue Component Implementation

```vue
<!-- packages-dsl/programming/src/components/Graph.vue -->
<template>
  <svg :width="width" :height="height" class="graph-visualization">
    <defs>
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="7"
        refX="9"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
      </marker>
    </defs>
    
    <!-- Edges -->
    <g class="edges">
      <g v-for="edge in positionedEdges" :key="`edge-${edge.from}-${edge.to}`">
        <line
          :x1="edge.x1"
          :y1="edge.y1"
          :x2="edge.x2"
          :y2="edge.y2"
          class="graph-edge"
          :class="getEdgeClass(edge)"
          :marker-end="directed ? 'url(#arrowhead)' : undefined"
        />
        <text
          v-if="weighted && edge.weight !== undefined"
          :x="(edge.x1 + edge.x2) / 2"
          :y="(edge.y1 + edge.y2) / 2 - 5"
          class="edge-weight"
        >
          {{ edge.weight }}
        </text>
      </g>
    </g>
    
    <!-- Nodes -->
    <g class="nodes">
      <g
        v-for="node in positionedNodes"
        :key="node.id"
        :transform="`translate(${node.x}, ${node.y})`"
      >
        <circle
          r="20"
          class="graph-node"
          :class="getNodeClass(node.id)"
        />
        <text
          text-anchor="middle"
          dominant-baseline="central"
          class="node-label"
        >
          {{ node.label || node.id }}
        </text>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useForceLayout, useCircularLayout } from '../composables/useGraphLayout'

interface GraphNode {
  id: string | number
  label?: string
  x?: number
  y?: number
}

interface GraphEdge {
  from: string | number
  to: string | number
  weight?: number
}

interface Props {
  nodes: GraphNode[]
  edges: GraphEdge[]
  visited?: (string | number)[]
  current?: string | number | null
  queue?: (string | number)[]
  path?: (string | number)[]
  directed?: boolean
  weighted?: boolean
  layout?: 'force' | 'circular' | 'grid' | 'tree'
}

const props = withDefaults(defineProps<Props>(), {
  visited: () => [],
  current: null,
  queue: () => [],
  path: () => [],
  directed: false,
  weighted: false,
  layout: 'force'
})

const width = ref(400)
const height = ref(300)

// Calculate node positions based on layout
const positionedNodes = computed(() => {
  switch (props.layout) {
    case 'circular':
      return useCircularLayout(props.nodes, width.value, height.value)
    case 'force':
    default:
      return useForceLayout(props.nodes, props.edges, width.value, height.value)
  }
})

const positionedEdges = computed(() => {
  return props.edges.map(edge => {
    const fromNode = positionedNodes.value.find(n => n.id === edge.from)
    const toNode = positionedNodes.value.find(n => n.id === edge.to)
    return {
      ...edge,
      x1: fromNode?.x || 0,
      y1: fromNode?.y || 0,
      x2: toNode?.x || 0,
      y2: toNode?.y || 0
    }
  })
})

const getNodeClass = (id: string | number) => {
  if (id === props.current) return 'current'
  if (props.path.includes(id)) return 'path'
  if (props.queue.includes(id)) return 'in-queue'
  if (props.visited.includes(id)) return 'visited'
  return ''
}

const getEdgeClass = (edge: GraphEdge) => {
  // Highlight edges in path
  const fromIdx = props.path.indexOf(edge.from)
  const toIdx = props.path.indexOf(edge.to)
  if (fromIdx !== -1 && toIdx !== -1 && Math.abs(fromIdx - toIdx) === 1) {
    return 'path'
  }
  return ''
}
</script>
```
