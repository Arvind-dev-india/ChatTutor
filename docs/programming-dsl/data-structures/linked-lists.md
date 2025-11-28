# Linked List DSL Element

## Overview

The `<linked-list>` element renders a linked list data structure with:
- Node boxes with value display
- Arrow connections between nodes
- Pointer markers (head, tail, current)
- Support for singly and doubly linked lists

## DSL Syntax

```xml
refs:
  nodes: [1, 2, 3, 4, 5]
  head: 0
  current: 2
  slow: 1
  fast: 3

<code-plane>
  <linked-list 
    :nodes="nodes"
    :head="head"
    :current="current"
    :type="'singly'"
  />
  
  <node-pointer name="head" :index="head" color="#22c55e" />
  <node-pointer name="slow" :index="slow" color="#3b82f6" />
  <node-pointer name="fast" :index="fast" color="#ef4444" />
</code-plane>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `nodes` | `(number \| string \| object)[]` | `[]` | Node values |
| `head` | `number` | `0` | Head pointer index |
| `tail` | `number` | `auto` | Tail pointer index |
| `current` | `number` | `-1` | Currently active node |
| `highlights` | `number[]` | `[]` | Highlighted nodes |
| `type` | `'singly' \| 'doubly' \| 'circular'` | `'singly'` | List type |
| `show-null` | `boolean` | `true` | Show null terminator |
| `show-addresses` | `boolean` | `false` | Show memory addresses |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |

## Node Structure

For complex nodes with multiple fields:

```xml
refs:
  nodes:
    - { value: 1, next: 1 }
    - { value: 2, next: 2 }
    - { value: 3, next: null }

<code-plane>
  <linked-list :nodes="nodes" :show-addresses="true" />
</code-plane>
```

## Doubly Linked List

```xml
refs:
  nodes: [10, 20, 30, 40, 50]
  current: 2

<code-plane title="Doubly Linked List">
  <linked-list 
    :nodes="nodes"
    :current="current"
    type="doubly"
  />
</code-plane>
```

This renders nodes with both `prev` and `next` arrows.

## Circular Linked List

```xml
refs:
  nodes: [1, 2, 3, 4]
  current: 0

<code-plane title="Circular Linked List">
  <linked-list 
    :nodes="nodes"
    :current="current"
    type="circular"
  />
</code-plane>
```

The last node's arrow curves back to the head.

## Animation Actions

```xml
<!-- Insert node -->
<list-insert :after="index" :value="newValue" />

<!-- Delete node -->
<list-delete :index="index" />

<!-- Reverse section -->
<list-reverse :start="0" :end="3" />

<!-- Move pointer -->
<pointer-move name="current" :to="newIndex" :duration="300" />
```

## Example: Reverse Linked List

```xml
refs:
  nodes: [1, 2, 3, 4, 5]
  prev: -1
  current: 0
  next: 1
  reversed: []

<code-plane title="Reverse Linked List">
  <linked-list 
    :nodes="nodes"
    :highlights="[current]"
    :reversed="reversed"
  />
  
  <node-pointer v-if="prev >= 0" name="prev" :index="prev" color="#9ca3af" />
  <node-pointer name="curr" :index="current" color="#3b82f6" />
  <node-pointer v-if="next < nodes.length" name="next" :index="next" color="#22c55e" />
  
  <step-info>
    Step: Reversing node {{ current }} → pointing back to {{ prev >= 0 ? prev : 'null' }}
  </step-info>
</code-plane>
```

## Example: Fast & Slow Pointers (Cycle Detection)

```xml
refs:
  nodes: [3, 2, 0, -4]
  cycleStart: 1
  slow: 0
  fast: 0
  hasCycle: true

<code-plane title="Floyd's Cycle Detection">
  <linked-list 
    :nodes="nodes"
    type="circular"
    :cycle-start="cycleStart"
  />
  
  <node-pointer name="🐢" :index="slow" color="#22c55e" />
  <node-pointer name="🐰" :index="fast" color="#ef4444" />
  
  <annotation v-if="slow === fast && slow > 0" type="success">
    Cycle detected! Pointers met at node {{ slow }}
  </annotation>
</code-plane>
```

## Example: Merge Two Sorted Lists

```xml
refs:
  list1: [1, 3, 5, 7]
  list2: [2, 4, 6, 8]
  merged: []
  p1: 0
  p2: 0

<code-plane title="Merge Two Sorted Lists">
  <div class="lists-container">
    <linked-list :nodes="list1" :current="p1" label="List 1" />
    <linked-list :nodes="list2" :current="p2" label="List 2" />
  </div>
  
  <div class="merged-list">
    <linked-list :nodes="merged" label="Merged" :highlights="[merged.length - 1]" />
  </div>
  
  <step-info>
    Comparing {{ list1[p1] }} vs {{ list2[p2] }} → 
    Taking {{ list1[p1] <= list2[p2] ? list1[p1] : list2[p2] }}
  </step-info>
</code-plane>
```

## Styling

Default node appearance:
```css
.linked-list-node {
  width: 60px;
  height: 40px;
  border: 2px solid #6366f1;
  border-radius: 8px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.linked-list-node.highlighted {
  border-color: #3b82f6;
  background: #eff6ff;
}

.linked-list-node.current {
  border-color: #ef4444;
  background: #fef2f2;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
}

.linked-list-arrow {
  width: 30px;
  height: 2px;
  background: #6366f1;
  position: relative;
}

.linked-list-arrow::after {
  content: '';
  position: absolute;
  right: 0;
  border: 5px solid transparent;
  border-left-color: #6366f1;
}
```

## Vue Component Implementation

```vue
<!-- packages-dsl/programming/src/components/LinkedList.vue -->
<template>
  <div class="linked-list" :class="orientation">
    <template v-for="(node, index) in nodes" :key="index">
      <!-- Node -->
      <div 
        class="ll-node"
        :class="getNodeClass(index)"
      >
        <div class="value">{{ getNodeValue(node) }}</div>
        <div v-if="showAddresses" class="address">0x{{ (1000 + index * 8).toString(16) }}</div>
      </div>
      
      <!-- Arrow -->
      <div 
        v-if="shouldShowArrow(index)" 
        class="ll-arrow"
        :class="{ 'doubly': type === 'doubly' }"
      >
        <svg viewBox="0 0 40 20">
          <line x1="0" y1="10" x2="30" y2="10" stroke="currentColor" stroke-width="2"/>
          <polygon points="30,5 40,10 30,15" fill="currentColor"/>
        </svg>
      </div>
    </template>
    
    <!-- Null terminator -->
    <div v-if="showNull && type !== 'circular'" class="ll-null">
      null
    </div>
    
    <!-- Circular arrow back to head -->
    <svg v-if="type === 'circular'" class="circular-arrow">
      <!-- Curved path back to head -->
    </svg>
    
    <!-- Pointers -->
    <slot name="pointers"></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  nodes: (number | string | { value: any; next?: number })[]
  head?: number
  tail?: number
  current?: number
  highlights?: number[]
  type?: 'singly' | 'doubly' | 'circular'
  showNull?: boolean
  showAddresses?: boolean
  orientation?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<Props>(), {
  head: 0,
  current: -1,
  highlights: () => [],
  type: 'singly',
  showNull: true,
  showAddresses: false,
  orientation: 'horizontal'
})

const getNodeValue = (node: any) => {
  return typeof node === 'object' ? node.value : node
}

const getNodeClass = (index: number) => {
  if (index === props.current) return 'current'
  if (props.highlights.includes(index)) return 'highlighted'
  return ''
}

const shouldShowArrow = (index: number) => {
  if (props.type === 'circular') return true
  return index < props.nodes.length - 1
}
</script>
```
