# Tasks: Tetris Clone Game

**Input**: Design documents from `/specs/002-tetris-clone-game/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Unit tests for game logic are requested in research.md and quickstart.md using Vitest.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Single project structure at repository root
- `src/logic/`, `src/components/`, `src/hooks/`, `src/styles/`, `src/types/`, `tests/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Vite project with React and TypeScript using `npm create vite@latest . -- --template react-ts`
- [x] T002 Install testing dependencies (Vitest, React Testing Library) per `quickstart.md`
- [x] T003 [P] Create directory structure: `src/logic`, `src/components`, `src/hooks`, `src/styles`, `src/types`, `tests/logic`, `tests/components`
- [x] T004 [P] Configure Vitest in `vite.config.ts` and setup `vitest.setup.ts`
- [x] T005 [P] Implement global CSS reset and base themes in `src/styles/index.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data structures and constants that MUST be complete before user story work

- [x] T006 [P] Define TypeScript interfaces for Tetromino, Board, and GameState in `src/types/game.ts`
- [x] T007 [P] Define Tetromino shapes (O, I, S, Z, L, J, T) and their colors in `src/logic/constants.ts`
- [x] T008 [P] Implement `createInitialBoard` utility to generate an empty 10x20 grid in `src/logic/engine.ts`

**Checkpoint**: Foundation ready - game engine and UI components can now be built.

---

## Phase 3: User Story 1 - Core Gameplay: Falling and Moving (Priority: P1) 🎯 MVP

**Goal**: Implement the basic game loop where pieces fall and users can move/rotate them.

**Independent Test**: Start the game, observe pieces falling, and verify left/right/rotate controls work via keyboard.

### Tests for User Story 1

- [x] T009 [P] [US1] Create unit tests for `spawnPiece`, `movePiece`, and `rotatePiece` in `tests/logic/engine.test.ts`

### Implementation for User Story 1

- [x] T010 [P] [US1] Implement `spawnPiece` logic in `src/logic/engine.ts`
- [x] T011 [P] [US1] Implement `movePiece` with collision detection in `src/logic/engine.ts`
- [x] T012 [P] [US1] Implement `rotatePiece` with basic boundary checks in `src/logic/engine.ts`
- [x] T013 [US1] Implement `useInterval` custom hook for game timing in `src/hooks/useInterval.ts`
- [x] T014 [US1] Implement `useGameLoop` hook to manage piece state, gravity, and input handling in `src/hooks/useGameLoop.ts`
- [x] T015 [P] [US1] Create `Cell` component for individual blocks in `src/components/Cell.tsx`
- [x] T016 [P] [US1] Create `Board` component using CSS Grid in `src/components/Board.tsx`
- [x] T017 [US1] Define CSS Grid layout for the playfield in `src/styles/Board.css`
- [x] T018 [US1] Integrate `Board` and `useGameLoop` into `src/App.tsx`

**Checkpoint**: User Story 1 is functional - standard falling block mechanics are playable.

---

## Phase 4: User Story 2 - Line Clearing and Scoring (Priority: P1)

**Goal**: Detect full rows, clear them, and update the player's score.

**Independent Test**: Fill a horizontal row and verify it disappears while blocks above it drop down and the score increases.

### Tests for User Story 2

- [x] T019 [P] [US2] Create unit tests for `checkLines` and line clearing logic in `tests/logic/engine.test.ts`

### Implementation for User Story 2

- [x] T020 [P] [US2] Implement `checkLines` logic to detect and remove full rows in `src/logic/engine.ts`
- [x] T021 [US2] Update `useGameLoop` hook to trigger line clearing and update score state in `src/hooks/useGameLoop.ts`
- [x] T022 [P] [US2] Create `Scoreboard` component to display score and level in `src/components/Scoreboard.tsx`
- [x] T023 [P] [US2] Create styling for the scoreboard in `src/styles/Scoreboard.css`
- [x] T024 [US2] Integrate `Scoreboard` into `src/App.tsx`

**Checkpoint**: User Story 2 is functional - the game progression and scoring loop are complete.

---

## Phase 5: User Story 3 - Game Over and Progression (Priority: P2)

**Goal**: Implement game over detection and "Next Piece" preview.

**Independent Test**: Stack blocks to the top and verify the game stops. Verify the next piece is correctly previewed.

### Tests for User Story 3

- [x] T025 [P] [US3] Create unit tests for `isGameOver` detection in `tests/logic/engine.test.ts`

### Implementation for User Story 3

- [x] T026 [P] [US3] Implement `isGameOver` logic in `src/logic/engine.ts`
- [x] T027 [US3] Update `useGameLoop` to manage a queue of pieces and detect game over state in `src/hooks/useGameLoop.ts`
- [x] T028 [P] [US3] Create `Preview` component to show the next piece in `src/components/Preview.tsx`
- [x] T029 [P] [US3] Create `GameOver` modal component in `src/components/GameOver.tsx`
- [x] T030 [P] [US3] Define styles for UI overlays and previews in `src/styles/UI.css`
- [x] T031 [US3] Integrate `Preview` and `GameOver` into `src/App.tsx`

**Checkpoint**: User Story 3 is functional - the complete game lifecycle is implemented.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T032 [P] Add keyboard event listeners for "Hard Drop" (Space) in `src/hooks/useGameLoop.ts`
- [x] T033 Implement level progression (speed increases every 10 lines) in `src/hooks/useGameLoop.ts`
- [x] T034 [P] Refine CSS transitions for block movement and line clearing in `src/styles/Board.css`
- [x] T035 [P] Final code cleanup and removal of unused Vite boilerplate
- [x] T036 Run `quickstart.md` validation and ensure all tests pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on T001-T003. BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Phase 2 completion.
- **Polish (Phase 6)**: Depends on all user stories.

### User Story Dependencies

- **US1 (P1)**: Independent after Phase 2.
- **US2 (P1)**: Depends on US1 (requires blocks on board to clear lines).
- **US3 (P2)**: Depends on US1 (requires pieces to stack).

### Parallel Opportunities

- T003, T004, T005 (Setup)
- T006, T007, T008 (Foundational)
- T009 (Tests) and T010-T012 (Logic) can start together.
- T015, T016, T017 (Components and Styles) can start together.
- UI components for US2 (T022, T023) can be built while logic (T020) is being tested.

---

## Parallel Example: User Story 1

```bash
# Implement logic and tests in parallel:
Task: "Implement movePiece with collision detection in src/logic/engine.ts"
Task: "Create unit tests for spawnPiece, movePiece, and rotatePiece in tests/logic/engine.test.ts"

# Build UI components and styles in parallel:
Task: "Create Cell component for individual blocks in src/components/Cell.tsx"
Task: "Define CSS Grid layout for the playfield in src/styles/Board.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Setup project and foundation (Phases 1 & 2).
2. Implement core falling and movement (Phase 3).
3. **STOP and VALIDATE**: Ensure blocks fall, move, and rotate without crashing.

### Incremental Delivery

1. Add line clearing (Phase 4) → Verify game is playable long-term.
2. Add Game Over and Preview (Phase 5) → Complete the game experience.
3. Polish (Phase 6) → Refine UX and performance.
