# Array DSL Element

## Overview

The `<array>` element renders an array/vector data structure with support for:
- Element highlighting
- Pointer/index markers
- Animations (swap, compare, insert, delete)
- Value display

## DSL Syntax

```xml
refs:
  arr: [3, 1, 4, 1, 5, 9, 2, 6]
  left: 0
  right: 7
  current: -1

<code-plane>
  <array 
    :data="arr" 
    :highlights="[left, right]"
    :current="current"
    :show-indices="true"
    :show-values="true"
    :bar-style="true"
  />
  
  <pointer name="L" :index="left" color="#3b82f6" />
  <pointer name="R" :index="right" color="#ef4444" />
</code-plane>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `data` | `number[] \| string[]` | `[]` | Array data to display |
| `highlights` | `number[]` | `[]` | Indices to highlight |
| `current` | `number` | `-1` | Currently active index |
| `sorted` | `number[]` | `[]` | Indices that are sorted (green) |
| `comparing` | `[number, number]` | `null` | Pair being compared (yellow) |
| `swapping` | `[number, number]` | `null` | Pair being swapped (red) |
| `show-indices` | `boolean` | `true` | Show index labels below |
| `show-values` | `boolean` | `true` | Show values inside/above bars |
| `bar-style` | `boolean` | `false` | Render as bar chart |
| `cell-style` | `boolean` | `true` | Render as cells |
| `max-value` | `number` | `auto` | Max value for bar scaling |
| `animation-speed` | `number` | `300` | Animation duration in ms |

## Pointer Element

```xml
<pointer 
  name="i" 
  :index="currentIndex" 
  color="#3b82f6"
  position="top|bottom"
/>
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string` | required | Pointer label |
| `index` | `number` | required | Position in array |
| `color` | `string` | `#3b82f6` | Pointer color |
| `position` | `string` | `bottom` | Above or below array |

## Animation Actions

```xml
<!-- Swap two elements -->
<array-swap :indices="[i, j]" :delay="500" />

<!-- Compare two elements -->
<array-compare :indices="[i, j]" :delay="300" />

<!-- Insert element -->
<array-insert :index="i" :value="5" />

<!-- Delete element -->
<array-delete :index="i" />

<!-- Highlight range -->
<array-highlight :start="left" :end="right" color="rgba(59, 130, 246, 0.3)" />
```

## Example: Two Pointers

```xml
refs:
  nums: [1, 2, 3, 4, 5, 6, 7, 8]
  left: 0
  right: 7
  target: 9
  found: false

<code-plane title="Two Sum - Sorted Array">
  <array 
    :data="nums" 
    :highlights="[left, right]"
    :show-indices="true"
  />
  
  <pointer name="L" :index="left" color="#3b82f6" />
  <pointer name="R" :index="right" color="#ef4444" />
  
  <label :x="0" :y="-50">
    Target: {{ target }} | Sum: {{ nums[left] + nums[right] }}
  </label>
  
  <annotation v-if="found" type="success">
    Found! nums[{{ left }}] + nums[{{ right }}] = {{ target }}
  </annotation>
</code-plane>
```

## Example: Bubble Sort

```xml
refs:
  arr: [64, 34, 25, 12, 22, 11, 90]
  i: 0
  j: 0
  sorted: []

<code-plane title="Bubble Sort">
  <array 
    :data="arr" 
    :comparing="[j, j+1]"
    :sorted="sorted"
    :bar-style="true"
    :max-value="100"
  />
  
  <step-info>
    Pass {{ i + 1 }}: Comparing arr[{{ j }}]={{ arr[j] }} with arr[{{ j+1 }}]={{ arr[j+1] }}
  </step-info>
</code-plane>
```

## Example: Binary Search

```xml
refs:
  arr: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
  left: 0
  right: 9
  mid: 4
  target: 13
  eliminated: []

<code-plane title="Binary Search">
  <array 
    :data="arr" 
    :highlights="[mid]"
    :eliminated="eliminated"
    :show-indices="true"
  />
  
  <pointer name="L" :index="left" color="#22c55e" />
  <pointer name="M" :index="mid" color="#eab308" />
  <pointer name="R" :index="right" color="#ef4444" />
  
  <label :y="-60">
    Searching for {{ target }} | mid={{ mid }}, arr[mid]={{ arr[mid] }}
  </label>
</code-plane>
```

## Styling

Default colors:
- Normal: `#6366f1` (Indigo)
- Highlighted: `#3b82f6` (Blue)
- Comparing: `#eab308` (Yellow)
- Swapping: `#ef4444` (Red)
- Sorted: `#22c55e` (Green)
- Eliminated: `#9ca3af` (Gray)

## Vue Component Implementation

```vue
<!-- packages-dsl/programming/src/components/Array.vue -->
<template>
  <div class="array-container">
    <div 
      v-for="(value, index) in data" 
      :key="index"
      class="array-cell"
      :class="getCellClass(index)"
      :style="getCellStyle(index)"
    >
      <span v-if="showValues" class="value">{{ value }}</span>
      <span v-if="showIndices" class="index">{{ index }}</span>
    </div>
    
    <!-- Pointers rendered via slot -->
    <slot name="pointers"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data: (number | string)[]
  highlights?: number[]
  current?: number
  sorted?: number[]
  comparing?: [number, number] | null
  swapping?: [number, number] | null
  showIndices?: boolean
  showValues?: boolean
  barStyle?: boolean
  maxValue?: number
  animationSpeed?: number
}

const props = withDefaults(defineProps<Props>(), {
  highlights: () => [],
  current: -1,
  sorted: () => [],
  comparing: null,
  swapping: null,
  showIndices: true,
  showValues: true,
  barStyle: false,
  animationSpeed: 300
})

const getCellClass = (index: number) => {
  if (props.swapping?.includes(index)) return 'swapping'
  if (props.comparing?.includes(index)) return 'comparing'
  if (props.sorted.includes(index)) return 'sorted'
  if (props.highlights.includes(index)) return 'highlighted'
  if (props.current === index) return 'current'
  return ''
}

const maxVal = computed(() => 
  props.maxValue || Math.max(...props.data.map(v => Number(v)), 1)
)

const getCellStyle = (index: number) => {
  if (!props.barStyle) return {}
  const height = (Number(props.data[index]) / maxVal.value) * 150
  return { height: `${height}px` }
}
</script>
```
