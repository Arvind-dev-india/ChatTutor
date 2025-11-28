# Advanced Tree DSL Elements

## Overview

Advanced tree data structures for competitive programming:
- Segment Tree
- Binary Indexed Tree (Fenwick Tree)
- Trie (Prefix Tree)
- AVL Tree / Red-Black Tree

---

## Segment Tree

### DSL Syntax

```xml
refs:
  arr: [1, 3, 5, 7, 9, 11]
  tree: []
  queryRange: [1, 4]
  currentNode: null
  operation: 'sum'

<code-plane title="Segment Tree">
  <segment-tree 
    :array="arr"
    :tree="tree"
    :query-range="queryRange"
    :current-node="currentNode"
    :operation="operation"
  />
</code-plane>
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `array` | `number[]` | `[]` | Original array |
| `tree` | `number[]` | `[]` | Segment tree array |
| `query-range` | `[number, number]` | `null` | Query range [L, R] |
| `update-index` | `number` | `null` | Index being updated |
| `current-node` | `number` | `null` | Current tree node |
| `operation` | `'sum' \| 'min' \| 'max' \| 'gcd'` | `'sum'` | Operation type |
| `show-ranges` | `boolean` | `true` | Show node ranges |

### Example: Range Sum Query

```xml
refs:
  arr: [1, 3, 5, 7, 9, 11]
  tree: [36, 9, 27, 4, 5, 16, 11, 1, 3, null, null, 7, 9, null, null]
  queryL: 1
  queryR: 4
  path: []
  result: null

<code-plane title="Segment Tree - Range Sum Query">
  <array :data="arr" :highlight-range="[queryL, queryR]" label="Original Array" />
  
  <segment-tree 
    :array="arr"
    :tree="tree"
    :query-range="[queryL, queryR]"
    :path="path"
    operation="sum"
  />
  
  <step-info>
    Query sum([{{ queryL }}, {{ queryR }}]) = {{ result }}
    Path: {{ path.join(' → ') }}
  </step-info>
</code-plane>
```

### Example: Point Update

```xml
refs:
  arr: [1, 3, 5, 7, 9, 11]
  tree: []
  updateIndex: 2
  newValue: 10
  affectedNodes: []

<code-plane title="Segment Tree - Point Update">
  <array 
    :data="arr" 
    :current="updateIndex"
    label="Updating arr[{{ updateIndex }}] = {{ newValue }}"
  />
  
  <segment-tree 
    :array="arr"
    :tree="tree"
    :update-path="affectedNodes"
  />
  
  <step-info>
    Propagating update from leaf to root.
    Affected nodes: {{ affectedNodes.join(' → ') }}
  </step-info>
</code-plane>
```

---

## Binary Indexed Tree (Fenwick Tree)

### DSL Syntax

```xml
refs:
  arr: [3, 2, -1, 6, 5, 4, -3, 3, 7, 2]
  bit: []
  queryIndex: 5
  currentIndex: null

<code-plane title="Binary Indexed Tree">
  <bit 
    :array="arr"
    :tree="bit"
    :query-index="queryIndex"
    :current-index="currentIndex"
    :show-responsibility="true"
  />
</code-plane>
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `array` | `number[]` | `[]` | Original array |
| `tree` | `number[]` | `[]` | BIT array |
| `query-index` | `number` | `null` | Prefix sum index |
| `update-index` | `number` | `null` | Update index |
| `show-responsibility` | `boolean` | `true` | Show node ranges |
| `show-binary` | `boolean` | `false` | Show binary indices |

### Example: Prefix Sum Query

```xml
refs:
  arr: [3, 2, -1, 6, 5, 4]
  bit: [0, 3, 5, -1, 10, 5, 9]
  queryIndex: 5
  path: []
  sum: null

<code-plane title="BIT - Prefix Sum Query">
  <array :data="arr" :highlight-range="[0, queryIndex]" label="Array" />
  
  <bit 
    :array="arr"
    :tree="bit"
    :path="path"
    :show-binary="true"
  />
  
  <step-info>
    sum(0..{{ queryIndex }}) = {{ sum }}
    Path: {{ path.map(i => `${i} (${i.toString(2)})`).join(' → ') }}
    Using: i -= (i & -i) to traverse
  </step-info>
</code-plane>
```

---

## Trie (Prefix Tree)

### DSL Syntax

```xml
refs:
  words: ['apple', 'app', 'apricot', 'banana']
  trie: null
  searchWord: 'app'
  currentPath: []

<code-plane title="Trie">
  <trie 
    :root="trie"
    :search-path="currentPath"
    :search-word="searchWord"
    :show-end-markers="true"
  />
</code-plane>
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `root` | `TrieNode` | `null` | Root of trie |
| `words` | `string[]` | `[]` | Words to display |
| `search-word` | `string` | `null` | Word being searched |
| `search-path` | `string[]` | `[]` | Current path |
| `prefix` | `string` | `null` | Prefix being matched |
| `show-end-markers` | `boolean` | `true` | Show word end markers |

### Example: Insert and Search

```xml
refs:
  trie: { children: {}, isEnd: false }
  words: ['cat', 'car', 'card', 'care', 'careful']
  insertingWord: 'care'
  currentChar: 0

<code-plane title="Trie - Insert Word">
  <trie 
    :root="trie"
    :inserting="insertingWord"
    :current-depth="currentChar"
    :show-end-markers="true"
  />
  
  <word-display 
    :word="insertingWord" 
    :current="currentChar"
  />
  
  <step-info>
    Inserting "{{ insertingWord }}" - processing '{{ insertingWord[currentChar] }}'
  </step-info>
</code-plane>
```

### Example: Autocomplete

```xml
refs:
  trie: null
  prefix: 'car'
  matches: []
  
<code-plane title="Trie - Autocomplete">
  <input-display :value="prefix" label="Type prefix:" />
  
  <trie 
    :root="trie"
    :prefix-path="prefix.split('')"
    :highlighted-subtree="matches"
  />
  
  <word-list :words="matches" label="Suggestions" />
</code-plane>
```

---

## AVL Tree

### DSL Syntax

```xml
refs:
  root: null
  insertValue: 15
  rotationType: null
  balanceFactors: {}

<code-plane title="AVL Tree">
  <avl-tree 
    :root="root"
    :inserting="insertValue"
    :rotation="rotationType"
    :show-balance-factors="true"
  />
</code-plane>
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `root` | `AVLNode` | `null` | Root node |
| `inserting` | `number` | `null` | Value being inserted |
| `rotation` | `'LL' \| 'RR' \| 'LR' \| 'RL'` | `null` | Current rotation |
| `show-balance-factors` | `boolean` | `true` | Show BF on nodes |
| `show-heights` | `boolean` | `false` | Show heights |

### Example: Rotations

```xml
refs:
  before: { value: 30, left: { value: 20, left: { value: 10 } } }
  after: { value: 20, left: { value: 10 }, right: { value: 30 } }
  rotation: 'LL'

<code-plane title="AVL - Left-Left Rotation">
  <div class="rotation-demo">
    <avl-tree :root="before" label="Before (Unbalanced)" />
    
    <rotation-arrow type="LL" />
    
    <avl-tree :root="after" label="After (Balanced)" />
  </div>
  
  <step-info>
    Node 30 has BF = 2 (left-heavy).
    Left child 20 has BF = 1 (left-heavy).
    → Perform Right Rotation (LL case)
  </step-info>
</code-plane>
```

---

## Styling

```css
/* Segment Tree */
.segment-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.seg-node {
  min-width: 60px;
  padding: 4px 8px;
  border: 2px solid #6366f1;
  border-radius: 8px;
  text-align: center;
  background: white;
}

.seg-node.in-range {
  border-color: #22c55e;
  background: #f0fdf4;
}

.seg-node.partial {
  border-color: #eab308;
  background: #fefce8;
}

.seg-node .value {
  font-weight: bold;
}

.seg-node .range {
  font-size: 10px;
  color: #6b7280;
}

/* BIT */
.bit-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bit-row {
  display: flex;
  gap: 4px;
}

.bit-cell {
  width: 50px;
  padding: 8px;
  border: 2px solid #6366f1;
  border-radius: 4px;
  text-align: center;
}

.bit-cell.active {
  border-color: #22c55e;
  background: #f0fdf4;
}

.bit-cell .binary {
  font-size: 10px;
  font-family: monospace;
  color: #6b7280;
}

/* Trie */
.trie-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.trie-node {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.trie-char {
  width: 30px;
  height: 30px;
  border: 2px solid #6366f1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.trie-char.end {
  border-color: #22c55e;
  background: #f0fdf4;
}

.trie-char.current {
  border-color: #ef4444;
  background: #fef2f2;
}

.trie-children {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

/* AVL */
.avl-node {
  position: relative;
}

.balance-factor {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #f3f4f6;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.balance-factor.unbalanced {
  background: #fef2f2;
  color: #ef4444;
}

.rotation-arrow {
  font-size: 24px;
  color: #6366f1;
  margin: 0 20px;
}
```

## Implementation Notes

### Segment Tree Layout

The segment tree is best visualized as a complete binary tree:
- Root represents entire array range [0, n-1]
- Each node covers range [l, r]
- Left child covers [l, mid], right child covers [mid+1, r]

### BIT Visualization

Show the "responsibility" of each index:
- Index i is responsible for range [i - (i & -i) + 1, i]
- Binary representation helps understand the pattern

### Trie Layout

Use a hierarchical tree layout where:
- Each edge is labeled with a character
- End-of-word nodes are marked distinctly
- Shared prefixes share the same path

### AVL Rotations

Animate the four rotation types:
- LL (Right Rotation)
- RR (Left Rotation)  
- LR (Left-Right Rotation)
- RL (Right-Left Rotation)
