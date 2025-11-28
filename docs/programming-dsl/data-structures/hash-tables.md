# Hash Table DSL Element

## Overview

The `<hash-table>` element visualizes hash maps/dictionaries showing:
- Bucket array structure
- Hash function visualization
- Collision handling (chaining, open addressing)
- Key-value pair operations

## DSL Syntax

```xml
refs:
  buckets: 8
  table:
    - []
    - [{ key: 'apple', value: 5 }]
    - []
    - [{ key: 'banana', value: 3 }, { key: 'cherry', value: 7 }]
    - []
    - [{ key: 'date', value: 2 }]
    - []
    - []
  currentKey: 'banana'
  currentHash: 3

<code-plane title="Hash Table">
  <hash-table 
    :buckets="buckets"
    :table="table"
    :current-bucket="currentHash"
    :current-key="currentKey"
    collision-handling="chaining"
  />
</code-plane>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `buckets` | `number` | `8` | Number of buckets |
| `table` | `Bucket[]` | `[]` | Table data |
| `current-bucket` | `number` | `-1` | Highlighted bucket |
| `current-key` | `string` | `null` | Key being operated on |
| `collision-handling` | `'chaining' \| 'linear' \| 'quadratic'` | `'chaining'` | Collision strategy |
| `show-hash` | `boolean` | `true` | Show hash computation |
| `load-factor` | `number` | computed | Current load factor |

## Hash Function Visualization

```xml
refs:
  key: 'hello'
  hashSteps: []
  finalHash: null

<code-plane title="Hash Function">
  <hash-function-viz 
    :key="key"
    :steps="hashSteps"
    :result="finalHash"
    :buckets="8"
  />
  
  <step-info>
    hash("{{ key }}") = {{ finalHash }} % {{ buckets }} = {{ finalHash % buckets }}
  </step-info>
</code-plane>
```

## Example: Insert Operation

```xml
refs:
  table: Array(8).fill([])
  key: 'apple'
  value: 5
  hash: null
  step: 'hashing'

<code-plane title="Hash Table Insert">
  <hash-computation 
    :key="key"
    :buckets="8"
    :result="hash"
  />
  
  <hash-table 
    :table="table"
    :current-bucket="hash"
    :inserting="{ key, value }"
  />
  
  <step-info>
    {{ step === 'hashing' ? `Computing hash for "${key}"` : `Inserting into bucket ${hash}` }}
  </step-info>
</code-plane>
```

## Example: Collision Handling (Chaining)

```xml
refs:
  table:
    - []
    - []
    - [{ key: 'cat', value: 1 }]
    - []
    - []
    - [{ key: 'dog', value: 2 }]
    - []
    - []
  newKey: 'act'
  newHash: 2

<code-plane title="Collision Handling - Chaining">
  <hash-table 
    :table="table"
    :current-bucket="newHash"
    collision-handling="chaining"
  />
  
  <annotation type="warning">
    Collision! "act" hashes to bucket {{ newHash }}, same as "cat".
    Adding to chain.
  </annotation>
</code-plane>
```

## Example: Two Sum with Hash Map

```xml
refs:
  nums: [2, 7, 11, 15]
  target: 9
  hashMap: {}
  currentIndex: 0
  complement: null
  found: false

<code-plane title="Two Sum - Hash Map Approach">
  <array 
    :data="nums"
    :current="currentIndex"
    :highlights="found ? [foundIndices] : []"
  />
  
  <hash-map-view 
    :map="hashMap"
    :searching="complement"
    :found-key="found ? complement : null"
  />
  
  <step-info>
    nums[{{ currentIndex }}] = {{ nums[currentIndex] }} |
    Looking for complement: {{ target }} - {{ nums[currentIndex] }} = {{ complement }}
  </step-info>
</code-plane>
```

## Example: Group Anagrams

```xml
refs:
  words: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
  hashMap: {}
  currentWord: null
  sortedKey: null

<code-plane title="Group Anagrams">
  <word-list :words="words" :current="currentWord" />
  
  <hash-map-view 
    :map="hashMap"
    :current-key="sortedKey"
    key-label="Sorted Key"
    value-label="Anagrams"
  />
  
  <step-info>
    Word: "{{ currentWord }}" → Sorted: "{{ sortedKey }}" → Group: [{{ hashMap[sortedKey]?.join(', ') }}]
  </step-info>
</code-plane>
```

## Example: LRU Cache

```xml
refs:
  capacity: 3
  cache: {}
  order: []
  operations: ['get(1)', 'put(1,1)', 'put(2,2)', 'get(1)', 'put(3,3)', 'put(4,4)', 'get(2)']
  currentOp: 0

<code-plane title="LRU Cache">
  <lru-cache-viz 
    :cache="cache"
    :order="order"
    :capacity="capacity"
    :current-operation="operations[currentOp]"
  />
  
  <operation-log :operations="operations" :current="currentOp" />
</code-plane>
```

## Hash Map View Component

For simple key-value visualization:

```xml
<hash-map-view 
  :map="{ a: 1, b: 2, c: 3 }"
  :highlighted-keys="['b']"
  layout="table"
/>
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `map` | `object` | `{}` | The hash map data |
| `highlighted-keys` | `string[]` | `[]` | Keys to highlight |
| `searching` | `string` | `null` | Key being searched |
| `layout` | `'table' \| 'grid' \| 'list'` | `'table'` | Display layout |

## Styling

```css
.hash-table {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.bucket {
  display: flex;
  align-items: center;
  min-height: 40px;
}

.bucket-index {
  width: 30px;
  text-align: center;
  font-weight: bold;
  color: #6b7280;
}

.bucket-content {
  flex: 1;
  display: flex;
  gap: 8px;
  padding: 4px 8px;
  border: 2px solid #e5e7eb;
  border-radius: 4px;
  min-height: 36px;
}

.bucket.active {
  border-color: #3b82f6;
  background: #eff6ff;
}

.bucket.collision {
  border-color: #eab308;
  background: #fefce8;
}

.kv-pair {
  display: flex;
  padding: 4px 8px;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 14px;
}

.kv-pair .key {
  font-weight: bold;
  color: #3b82f6;
}

.kv-pair .value {
  color: #6b7280;
}

.chain-arrow {
  color: #9ca3af;
}

/* Hash computation */
.hash-computation {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #f9fafb;
  border-radius: 8px;
  font-family: monospace;
}

.hash-step {
  padding: 4px 8px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
}

.hash-result {
  font-weight: bold;
  color: #22c55e;
}
```

## Vue Component

```vue
<!-- packages-dsl/programming/src/components/HashTable.vue -->
<template>
  <div class="hash-table-container">
    <!-- Hash computation display -->
    <div v-if="showHash && currentKey" class="hash-computation">
      <span class="key">"{{ currentKey }}"</span>
      <span class="arrow">→</span>
      <span class="hash-func">hash()</span>
      <span class="arrow">→</span>
      <span class="hash-result">{{ currentBucket }}</span>
    </div>
    
    <!-- Buckets -->
    <div class="buckets">
      <div 
        v-for="(bucket, index) in table"
        :key="index"
        class="bucket"
        :class="{ 
          active: index === currentBucket,
          collision: index === currentBucket && bucket.length > 0 && inserting
        }"
      >
        <div class="bucket-index">[{{ index }}]</div>
        
        <div class="bucket-content">
          <template v-if="bucket.length === 0">
            <span class="empty">∅</span>
          </template>
          
          <template v-else>
            <div 
              v-for="(item, idx) in bucket"
              :key="item.key"
              class="kv-pair"
              :class="{ highlight: item.key === currentKey }"
            >
              <span class="key">{{ item.key }}</span>:
              <span class="value">{{ item.value }}</span>
              <span v-if="idx < bucket.length - 1" class="chain-arrow">→</span>
            </div>
          </template>
          
          <!-- Show inserting item -->
          <div v-if="inserting && index === currentBucket" class="kv-pair inserting">
            <span class="key">{{ inserting.key }}</span>:
            <span class="value">{{ inserting.value }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Stats -->
    <div class="hash-stats">
      <span>Size: {{ totalItems }}</span>
      <span>Load Factor: {{ (totalItems / buckets).toFixed(2) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface KVPair {
  key: string
  value: any
}

interface Props {
  buckets: number
  table: KVPair[][]
  currentBucket?: number
  currentKey?: string | null
  inserting?: KVPair | null
  collisionHandling?: 'chaining' | 'linear' | 'quadratic'
  showHash?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  buckets: 8,
  currentBucket: -1,
  currentKey: null,
  inserting: null,
  collisionHandling: 'chaining',
  showHash: true
})

const totalItems = computed(() => {
  return props.table.reduce((sum, bucket) => sum + bucket.length, 0)
})
</script>
```
