# Stack & Queue DSL Elements

## Overview

Stack and Queue visualizations for understanding LIFO and FIFO operations.

## Stack DSL

```xml
refs:
  stack: [1, 2, 3, 4, 5]
  top: 4

<code-plane title="Stack (LIFO)">
  <stack 
    :data="stack"
    :top="top"
    :capacity="10"
    orientation="vertical"
  />
</code-plane>
```

### Stack Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `any[]` | `[]` | Stack contents |
| `top` | `number` | `data.length - 1` | Top pointer |
| `capacity` | `number` | `auto` | Max capacity |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout |
| `show-pointer` | `boolean` | `true` | Show top pointer |
| `highlight-top` | `boolean` | `true` | Highlight top element |

### Stack Actions

```xml
<stack-push :value="newValue" :duration="300" />
<stack-pop :duration="300" />
<stack-peek />
```

### Example: Valid Parentheses

```xml
refs:
  input: "({[]})"
  stack: []
  currentIndex: 0
  isValid: true

<code-plane title="Valid Parentheses">
  <string-display 
    :text="input" 
    :current="currentIndex"
    :matched="matchedIndices"
  />
  
  <stack 
    :data="stack"
    :highlight-top="true"
    orientation="horizontal"
  />
  
  <step-info>
    Character '{{ input[currentIndex] }}': 
    {{ isOpenBracket(input[currentIndex]) ? 'Push to stack' : 'Check and pop' }}
  </step-info>
</code-plane>
```

### Example: Min Stack

```xml
refs:
  mainStack: [3, 5, 2, 1, 4]
  minStack: [3, 3, 2, 1, 1]
  top: 4

<code-plane title="Min Stack">
  <div class="dual-stack">
    <stack :data="mainStack" label="Main Stack" />
    <stack :data="minStack" label="Min Stack" :highlight-min="true" />
  </div>
  
  <label>Current Min: {{ minStack[top] }}</label>
</code-plane>
```

---

## Queue DSL

```xml
refs:
  queue: [1, 2, 3, 4, 5]
  front: 0
  rear: 4

<code-plane title="Queue (FIFO)">
  <queue 
    :data="queue"
    :front="front"
    :rear="rear"
    :capacity="10"
  />
</code-plane>
```

### Queue Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `any[]` | `[]` | Queue contents |
| `front` | `number` | `0` | Front pointer |
| `rear` | `number` | `data.length - 1` | Rear pointer |
| `capacity` | `number` | `auto` | Max capacity |
| `type` | `'linear' \| 'circular'` | `'linear'` | Queue type |
| `show-pointers` | `boolean` | `true` | Show front/rear |

### Queue Actions

```xml
<queue-enqueue :value="newValue" :duration="300" />
<queue-dequeue :duration="300" />
<queue-peek />
```

### Example: BFS with Queue

```xml
refs:
  graph: { nodes: [...], edges: [...] }
  queue: [0]
  visited: []
  current: null

<code-plane title="BFS Traversal">
  <graph :nodes="graph.nodes" :edges="graph.edges" :visited="visited" :current="current" />
  
  <queue 
    :data="queue"
    label="BFS Queue"
    :highlight-front="true"
  />
  
  <label>Visited: {{ visited.join(' → ') }}</label>
</code-plane>
```

---

## Circular Queue

```xml
refs:
  buffer: [null, null, null, null, null]
  data: [1, 2, 3]
  front: 0
  rear: 2
  size: 3

<code-plane title="Circular Queue">
  <circular-queue 
    :buffer="buffer"
    :front="front"
    :rear="rear"
    :size="size"
  />
  
  <label>
    Size: {{ size }} / {{ buffer.length }} |
    Front: {{ front }} | Rear: {{ rear }}
  </label>
</code-plane>
```

---

## Deque (Double-Ended Queue)

```xml
refs:
  deque: [1, 2, 3, 4, 5]
  front: 0
  rear: 4

<code-plane title="Deque">
  <deque 
    :data="deque"
    :front="front"
    :rear="rear"
  />
</code-plane>
```

### Deque Actions

```xml
<deque-push-front :value="newValue" />
<deque-push-back :value="newValue" />
<deque-pop-front />
<deque-pop-back />
```

### Example: Sliding Window Maximum

```xml
refs:
  nums: [1, 3, -1, -3, 5, 3, 6, 7]
  k: 3
  deque: []
  windowStart: 0
  result: []

<code-plane title="Sliding Window Maximum">
  <array 
    :data="nums"
    :window-start="windowStart"
    :window-end="windowStart + k - 1"
    :highlights="deque"
  />
  
  <deque 
    :data="deque"
    label="Monotonic Deque (indices)"
  />
  
  <array :data="result" label="Result" />
  
  <step-info>
    Window [{{ windowStart }}, {{ windowStart + k - 1 }}] | 
    Max: {{ nums[deque[0]] }}
  </step-info>
</code-plane>
```

---

## Priority Queue / Heap

See [Heaps](./heaps.md) for detailed heap visualization.

```xml
refs:
  heap: [1, 3, 2, 7, 6, 4, 5]
  type: 'min'

<code-plane title="Priority Queue (Min Heap)">
  <priority-queue 
    :data="heap"
    :type="type"
  />
</code-plane>
```

---

## Styling

```css
/* Stack */
.stack-container {
  display: flex;
  flex-direction: column-reverse;
  border: 2px solid #6366f1;
  border-radius: 4px;
  padding: 4px;
  min-width: 60px;
}

.stack-element {
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  background: white;
  text-align: center;
  transition: all 0.3s;
}

.stack-element.top {
  background: #eff6ff;
  border-color: #3b82f6;
}

.stack-pointer {
  position: absolute;
  right: -40px;
  color: #3b82f6;
  font-weight: bold;
}

/* Queue */
.queue-container {
  display: flex;
  border: 2px solid #6366f1;
  border-radius: 4px;
  padding: 4px;
}

.queue-element {
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  background: white;
  text-align: center;
}

.queue-element.front {
  background: #f0fdf4;
  border-color: #22c55e;
}

.queue-element.rear {
  background: #fef2f2;
  border-color: #ef4444;
}

/* Circular Queue */
.circular-queue {
  position: relative;
  width: 200px;
  height: 200px;
}

.cq-slot {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cq-slot.filled {
  background: #eff6ff;
  border-color: #3b82f6;
}

.cq-slot.front {
  border-color: #22c55e;
  border-width: 3px;
}

.cq-slot.rear {
  border-color: #ef4444;
  border-width: 3px;
}
```

## Vue Components

```vue
<!-- Stack.vue -->
<template>
  <div class="stack-container" :class="orientation">
    <div class="stack-label">{{ label || 'Stack' }}</div>
    
    <div 
      v-for="(item, index) in displayData" 
      :key="index"
      class="stack-element"
      :class="{ top: index === top, pushing: isPushing && index === top }"
    >
      {{ item }}
    </div>
    
    <div v-if="showPointer && top >= 0" class="stack-pointer">
      ← top
    </div>
    
    <div class="stack-base">Bottom</div>
  </div>
</template>

<!-- Queue.vue -->
<template>
  <div class="queue-container">
    <div class="queue-label">{{ label || 'Queue' }}</div>
    
    <div class="queue-pointer front-pointer">front →</div>
    
    <div 
      v-for="(item, index) in data" 
      :key="index"
      class="queue-element"
      :class="{ 
        front: index === front, 
        rear: index === rear,
        processing: index === current
      }"
    >
      {{ item }}
    </div>
    
    <div class="queue-pointer rear-pointer">← rear</div>
  </div>
</template>
```
