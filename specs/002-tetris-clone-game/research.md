# Research: Tetris Clone Game

## Decision: Vitest for Testing
**Rationale**: Vitest is the native testing framework for Vite projects. It shares the same configuration and transform pipeline, leading to faster startup and better developer experience compared to Jest.
**Alternatives considered**: Jest (requires more complex setup for Vite/ESM).

## Decision: CSS Grid for Playfield
**Rationale**: The Tetris board is a fixed 10x20 grid. CSS Grid allows for precise placement of blocks and is naturally responsive when using `fr` units or `clamp()`.
**Alternatives considered**: Flexbox (harder to manage 2D collisions and row alignment), Canvas (more performant for thousands of objects, but overkill for 200 grid cells and lacks React component benefits).

## Decision: Immutable Game Engine (Pure Functions)
**Rationale**: To maintain clean code and separation of concerns, the game state should be updated via pure functions (e.g., `movePiece(board, piece, direction)`). This makes the logic 100% testable and predictable.
**Alternatives considered**: Class-based state with mutations (harder to track in React's reactive cycle).

## Decision: Custom Hook for Game Loop
**Rationale**: Use a custom `useInterval` hook to handle gravity and a `useGameLoop` hook to coordinate logic, inputs, and state.
**Alternatives considered**: Putting everything in `useEffect` (becomes monolithic and hard to maintain).
