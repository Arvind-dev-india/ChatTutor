# Programming DSL Architecture

## Multi-Agent System

ChatTutor uses a multi-agent architecture where specialized agents handle different visualization domains:

### Existing Agents
- **Agent**: Main conversational agent that interacts with users
- **Painter**: Expert agent for mathematical visualizations (functions, geometry)

### New Agent: Programmer
- **Purpose**: Expert agent for data structure and algorithm visualizations
- **Location**: `packages/agent/src/programmer.ts`
- **Prompt**: `packages/agent/src/prompts/programmer.ts`

## Agent Communication Flow

```
User Message
    ↓
Main Agent (decides what tools/agents to use)
    ↓
┌─────────────────────────────────────────┐
│  Tool Selection                          │
│  - create_canvas → Painter (math)        │
│  - create_dscanvas → Programmer (DSA)    │
│  - note → Add notes to page              │
│  - create_slider → Interactive controls  │
└─────────────────────────────────────────┘
    ↓
Visualization rendered on whiteboard
```

## Library Structure

### Math Library (existing)
```
libs/math/
├── src/
│   ├── prefabs/     # Canvas components (dot, line, func, etc.)
│   └── docs/        # DSL documentation for Painter agent
```

### Programming Library (new)
```
libs/programming/
├── package.json
└── src/
    ├── index.ts
    ├── prefabs/     # DS components (array, tree, graph, etc.)
    │   ├── dscanvas.ts
    │   ├── array.ts
    │   ├── linkedlist.ts
    │   ├── binarytree.ts
    │   ├── graph.ts
    │   ├── stack.ts
    │   ├── queue.ts
    │   ├── heap.ts
    │   ├── hashtable.ts
    │   ├── trie.ts
    │   └── codeblock.ts
    └── docs/        # DSL documentation for Programmer agent
        ├── index.ts
        ├── canvas.doc.ts
        ├── array.doc.ts
        ├── linkedlist.doc.ts
        ├── binarytree.doc.ts
        ├── graph.doc.ts
        ├── stack.doc.ts
        ├── queue.doc.ts
        ├── heap.doc.ts
        ├── hashtable.doc.ts
        ├── trie.doc.ts
        └── codeblock.doc.ts
```

## Configuration

### Environment Variables
```bash
# Model for programmer agent (falls back to AGENT_MODEL)
PROGRAMMER_MODEL=claude-sonnet-4.5
```

### Agent Registration
The programmer agent needs to be registered in the main agent's tool definitions to be callable.

## DSL Root Element

- **Math (Painter)**: `<plane>` - coordinate system for math
- **Programming (Programmer)**: `<dscanvas>` - discrete canvas for data structures

## Color Scheme

Both libraries use the same theme colors:
- `primary` - Main highlight
- `secondary` - Visited/processed
- `warning` - Currently active/comparing
- `success` - Completed/found
- `info` - Information display
- `accent` - Special emphasis

## Animation System

Uses the same reactive animation system as math:
- Reactive variables with `refs` in document header
- Sliders for interactive control
- Animations defined with `<duration, delay>` syntax

## Next Steps

1. **Phase 1**: Implement basic prefabs (array, linkedlist, stack, queue)
2. **Phase 2**: Implement tree and graph prefabs
3. **Phase 3**: Implement advanced structures (heap, hashtable, trie)
4. **Phase 4**: Implement code visualization component
5. **Integration**: Update main agent to route programming queries to Programmer agent
