# Programming DSL for ChatTutor

This document outlines the plan to extend ChatTutor's DSL (Domain Specific Language) to support programming and algorithm visualization, similar to how it currently supports mathematics and geometry.

## Overview

ChatTutor currently supports STEM education with DSL elements for:
- **Geometry**: `<plane>`, `<dot>`, `<polygon>`, `<line>`, `<arrow>`
- **Functions**: `<func>`, `<label>`
- **Animations**: Through the `@dsl/animation` package

We will extend this to support **Computer Science and Programming** concepts.

## Goals

1. Visualize common data structures (arrays, trees, graphs, linked lists)
2. Animate algorithms step-by-step
3. Support reactive variables for interactive exploration
4. Maintain consistency with existing DSL patterns

## New DSL Elements

See individual documentation files for each data structure:

- [Arrays & Vectors](./data-structures/arrays.md)
- [Linked Lists](./data-structures/linked-lists.md)
- [Trees](./data-structures/trees.md)
- [Graphs](./data-structures/graphs.md)
- [Stacks & Queues](./data-structures/stacks-queues.md)
- [Hash Tables](./data-structures/hash-tables.md)
- [Heaps](./data-structures/heaps.md)
- [Advanced Trees](./data-structures/advanced-trees.md)

## Implementation Plan

### Phase 1: Core Data Structures
1. Array visualization with highlighting and pointers
2. Binary tree rendering
3. Linked list with node connections

### Phase 2: Algorithm Animations
1. Sorting algorithms (bubble, merge, quick)
2. Search algorithms (binary search, DFS, BFS)
3. Two-pointer techniques

### Phase 3: Advanced Structures
1. Graphs (directed, undirected, weighted)
2. Segment trees, BIT
3. Tries, Heaps

### Phase 4: Integration
1. LeetCode problem integration
2. Custom test case visualization
3. Code execution sync

## File Structure

```
packages-dsl/
├── programming/           # New package for programming DSL
│   ├── src/
│   │   ├── components/
│   │   │   ├── Array.vue
│   │   │   ├── Tree.vue
│   │   │   ├── LinkedList.vue
│   │   │   ├── Graph.vue
│   │   │   ├── Stack.vue
│   │   │   ├── Queue.vue
│   │   │   ├── Heap.vue
│   │   │   └── HashTable.vue
│   │   ├── composables/
│   │   │   ├── useArrayAnimation.ts
│   │   │   ├── useTreeTraversal.ts
│   │   │   └── useGraphLayout.ts
│   │   └── index.ts
│   └── package.json
├── knowledge/             # Extend existing knowledge base
│   └── programming/
│       ├── algorithms.md
│       └── data-structures.md
```

## Contributing

When adding new DSL elements:
1. Follow existing naming conventions
2. Support reactive variables via `refs:`
3. Include animation capabilities
4. Add knowledge base entries for AI prompts
