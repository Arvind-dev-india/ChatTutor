# Heap DSL Element

## Overview

The `<heap>` element visualizes heap data structures:
- Min Heap and Max Heap
- Binary heap as array and tree view
- Heapify operations
- Priority queue operations

## DSL Syntax

```xml
refs:
  heap: [1, 3, 2, 7, 6, 4, 5]
  type: 'min'
  currentIndex: null
  swapping: null

<code-plane title="Min Heap">
  <heap 
    :data="heap"
    :type="type"
    :current="currentIndex"
    :swapping="swapping"
    :show-array="true"
    :show-tree="true"
  />
</code-plane>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `number[]` | `[]` | Heap array |
| `type` | `'min' \| 'max'` | `'min'` | Heap type |
| `current` | `number` | `-1` | Current index |
| `comparing` | `[number, number]` | `null` | Indices being compared |
| `swapping` | `[number, number]` | `null` | Indices being swapped |
| `show-array` | `boolean` | `true` | Show array view |
| `show-tree` | `boolean` | `true` | Show tree view |
| `show-indices` | `boolean` | `true` | Show index labels |

## Index Relationships

```
Parent of i: Math.floor((i - 1) / 2)
Left child of i: 2 * i + 1
Right child of i: 2 * i + 2
```

## Example: Heap Insert

```xml
refs:
  heap: [1, 3, 2, 7, 6, 4, 5]
  newValue: 0
  currentIndex: 7
  phase: 'bubbling'

<code-plane title="Heap Insert (Bubble Up)">
  <heap 
    :data="[...heap, newValue]"
    type="min"
    :current="currentIndex"
    :path="bubblePath"
  />
  
  <step-info>
    Inserting {{ newValue }} at index {{ currentIndex }}.
    Parent at index {{ Math.floor((currentIndex - 1) / 2) }} = {{ heap[Math.floor((currentIndex - 1) / 2)] }}.
    {{ newValue < heap[Math.floor((currentIndex - 1) / 2)] ? 'Swap needed!' : 'Heap property satisfied.' }}
  </step-info>
</code-plane>
```

## Example: Extract Min/Max

```xml
refs:
  heap: [1, 3, 2, 7, 6, 4, 5]
  extracted: null
  currentIndex: 0
  phase: 'heapify'

<code-plane title="Extract Min (Heapify Down)">
  <heap 
    :data="heap"
    type="min"
    :current="currentIndex"
    :comparing="comparingIndices"
    :swapping="swappingIndices"
  />
  
  <div class="extracted">
    Extracted: {{ extracted }}
  </div>
  
  <step-info>
    Heapifying down from index {{ currentIndex }}.
    Comparing with children at {{ 2 * currentIndex + 1 }} and {{ 2 * currentIndex + 2 }}.
  </step-info>
</code-plane>
```

## Example: Build Heap (Heapify)

```xml
refs:
  array: [4, 10, 3, 5, 1]
  heap: [4, 10, 3, 5, 1]
  currentIndex: 2
  phase: 'building'

<code-plane title="Build Heap from Array">
  <div class="dual-view">
    <array :data="array" label="Original Array" />
    <heap :data="heap" type="min" :current="currentIndex" />
  </div>
  
  <step-info>
    Building heap from bottom-up.
    Starting heapify at index {{ currentIndex }} (last non-leaf).
  </step-info>
</code-plane>
```

## Example: Heap Sort

```xml
refs:
  heap: [9, 7, 8, 3, 4, 2, 1]
  sorted: []
  phase: 'extracting'

<code-plane title="Heap Sort">
  <heap 
    :data="heap"
    type="max"
    :sorted-portion="sorted.length"
  />
  
  <array :data="sorted" label="Sorted" :highlights="[sorted.length - 1]" />
  
  <step-info>
    Extract max ({{ heap[0] }}) and heapify.
    Sorted so far: [{{ sorted.join(', ') }}]
  </step-info>
</code-plane>
```

## Example: K-th Largest Element

```xml
refs:
  nums: [3, 2, 1, 5, 6, 4]
  k: 2
  minHeap: []
  currentIndex: 0

<code-plane title="K-th Largest using Min Heap of size K">
  <array :data="nums" :current="currentIndex" label="Input" />
  
  <heap 
    :data="minHeap"
    type="min"
    :max-size="k"
  />
  
  <step-info>
    Processing {{ nums[currentIndex] }}.
    Heap size: {{ minHeap.length }} / {{ k }}.
    {{ minHeap.length === k ? `Min in heap: ${minHeap[0]}` : 'Building heap...' }}
  </step-info>
  
  <label v-if="currentIndex >= nums.length - 1">
    {{ k }}-th largest: {{ minHeap[0] }}
  </label>
</code-plane>
```

## Example: Merge K Sorted Lists

```xml
refs:
  lists:
    - [1, 4, 5]
    - [1, 3, 4]
    - [2, 6]
  minHeap: []
  result: []

<code-plane title="Merge K Sorted Lists">
  <div class="k-lists">
    <linked-list 
      v-for="(list, i) in lists" 
      :key="i"
      :nodes="list"
      :current="listPointers[i]"
      :label="`List ${i + 1}`"
    />
  </div>
  
  <heap 
    :data="minHeap"
    type="min"
    label="Min Heap (value, listIndex)"
  />
  
  <linked-list :nodes="result" label="Merged Result" />
</code-plane>
```

## Styling

```css
.heap-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.heap-array {
  display: flex;
  gap: 4px;
}

.heap-cell {
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #6366f1;
  border-radius: 4px;
  background: white;
}

.heap-cell.current {
  border-color: #ef4444;
  background: #fef2f2;
}

.heap-cell.comparing {
  border-color: #eab308;
  background: #fefce8;
}

.heap-cell.swapping {
  border-color: #22c55e;
  background: #f0fdf4;
  animation: swap 0.3s ease-in-out;
}

.heap-cell .value {
  font-weight: bold;
}

.heap-cell .index {
  font-size: 10px;
  color: #9ca3af;
}

/* Tree view */
.heap-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.heap-level {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.heap-node {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: relative;
}

.heap-node.root {
  border-width: 3px;
}

.heap-node.violating {
  border-color: #ef4444;
  background: #fef2f2;
}

.heap-edge {
  stroke: #9ca3af;
  stroke-width: 2;
}

.heap-edge.swapping {
  stroke: #22c55e;
  stroke-width: 3;
  stroke-dasharray: 5, 5;
  animation: dash 0.5s linear infinite;
}

@keyframes swap {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes dash {
  to { stroke-dashoffset: -10; }
}
```

## Vue Component

```vue
<!-- packages-dsl/programming/src/components/Heap.vue -->
<template>
  <div class="heap-container">
    <!-- Array representation -->
    <div v-if="showArray" class="heap-array-view">
      <div class="heap-label">Array View</div>
      <div class="heap-array">
        <div 
          v-for="(value, index) in data"
          :key="index"
          class="heap-cell"
          :class="getCellClass(index)"
        >
          <span class="value">{{ value }}</span>
          <span v-if="showIndices" class="index">{{ index }}</span>
        </div>
      </div>
    </div>
    
    <!-- Tree representation -->
    <div v-if="showTree" class="heap-tree-view">
      <div class="heap-label">Tree View</div>
      <svg :width="treeWidth" :height="treeHeight">
        <!-- Edges -->
        <line
          v-for="edge in edges"
          :key="`edge-${edge.parent}-${edge.child}`"
          :x1="edge.x1"
          :y1="edge.y1"
          :x2="edge.x2"
          :y2="edge.y2"
          class="heap-edge"
          :class="{ swapping: isSwappingEdge(edge) }"
        />
        
        <!-- Nodes -->
        <g
          v-for="node in treeNodes"
          :key="node.index"
          :transform="`translate(${node.x}, ${node.y})`"
        >
          <circle
            r="20"
            class="heap-node"
            :class="getCellClass(node.index)"
          />
          <text
            text-anchor="middle"
            dominant-baseline="central"
            class="node-value"
          >
            {{ node.value }}
          </text>
          <text
            y="30"
            text-anchor="middle"
            class="node-index"
          >
            [{{ node.index }}]
          </text>
        </g>
      </svg>
    </div>
    
    <!-- Heap property indicator -->
    <div class="heap-property">
      <span :class="isValidHeap ? 'valid' : 'invalid'">
        {{ type === 'min' ? 'Min' : 'Max' }} Heap Property: 
        {{ isValidHeap ? '✓ Satisfied' : '✗ Violated' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data: number[]
  type?: 'min' | 'max'
  current?: number
  comparing?: [number, number] | null
  swapping?: [number, number] | null
  showArray?: boolean
  showTree?: boolean
  showIndices?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'min',
  current: -1,
  comparing: null,
  swapping: null,
  showArray: true,
  showTree: true,
  showIndices: true
})

const getCellClass = (index: number) => {
  if (props.swapping?.includes(index)) return 'swapping'
  if (props.comparing?.includes(index)) return 'comparing'
  if (index === props.current) return 'current'
  return ''
}

// Calculate tree node positions
const treeNodes = computed(() => {
  const nodes = []
  const levelWidth = 400
  
  props.data.forEach((value, index) => {
    const level = Math.floor(Math.log2(index + 1))
    const posInLevel = index - (Math.pow(2, level) - 1)
    const nodesInLevel = Math.pow(2, level)
    const spacing = levelWidth / (nodesInLevel + 1)
    
    nodes.push({
      index,
      value,
      x: spacing * (posInLevel + 1),
      y: level * 60 + 30,
      level
    })
  })
  
  return nodes
})

// Calculate edges
const edges = computed(() => {
  const result = []
  
  for (let i = 1; i < props.data.length; i++) {
    const parentIdx = Math.floor((i - 1) / 2)
    const parent = treeNodes.value[parentIdx]
    const child = treeNodes.value[i]
    
    result.push({
      parent: parentIdx,
      child: i,
      x1: parent.x,
      y1: parent.y + 20,
      x2: child.x,
      y2: child.y - 20
    })
  }
  
  return result
})

// Check heap property
const isValidHeap = computed(() => {
  for (let i = 0; i < props.data.length; i++) {
    const left = 2 * i + 1
    const right = 2 * i + 2
    
    if (props.type === 'min') {
      if (left < props.data.length && props.data[i] > props.data[left]) return false
      if (right < props.data.length && props.data[i] > props.data[right]) return false
    } else {
      if (left < props.data.length && props.data[i] < props.data[left]) return false
      if (right < props.data.length && props.data[i] < props.data[right]) return false
    }
  }
  return true
})
</script>
```
