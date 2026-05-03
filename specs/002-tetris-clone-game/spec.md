# Feature Specification: Tetris Clone Game

**Feature Branch**: `002-tetris-clone-game`  
**Created**: 2026-05-03  
**Status**: Draft  
**Input**: User description: "테트리스 클론 게임을 만들고 싶어. 테트리스 블록(테트로미노)이 위에서 아래로 떨어지고, 사용자가 블록을 좌우로 이동하거나 회전시킬 수 있어야 해. 한 줄이 꽉 차면 해당 줄이 사라지고 점수가 올라가. 게임 오버 조건은 블록이 맨 위에 쌓였을 때야. 점수판과 다음 블록 미리보기 기능도 있어야 해."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Core Gameplay: Falling and Moving (Priority: P1)

As a player, I want to see tetrominoes falling from the top and be able to move them left, right, or rotate them so that I can position them strategically on the board.

**Why this priority**: This is the fundamental mechanic of Tetris. Without falling blocks and user controls, the game does not exist.

**Independent Test**: Can be tested by starting the game and observing blocks falling, and using input keys to verify movement and rotation.

**Acceptance Scenarios**:

1. **Given** the game has started, **When** a new tetromino spawns, **Then** it should move downwards automatically at a constant interval.
2. **Given** a falling tetromino, **When** the user presses the left or right arrow keys, **Then** the tetromino should move one column in that direction if no obstacles exist.
3. **Given** a falling tetromino, **When** the user presses the rotation key, **Then** the tetromino should rotate 90 degrees clockwise if the rotation does not cause a collision.

---

### User Story 2 - Line Clearing and Scoring (Priority: P1)

As a player, I want completed rows to disappear and my score to increase so that I can keep playing and track my progress.

**Why this priority**: Essential for the "win" condition (clearing lines) and the progression loop of the game.

**Independent Test**: Can be tested by manually filling a row and verifying it disappears and the score updates.

**Acceptance Scenarios**:

1. **Given** a tetromino lands and completes a horizontal row, **When** the row is full, **Then** the row should be removed from the board and blocks above it should drop down.
2. **Given** a row is cleared, **When** the clearing animation completes, **Then** the player's total score should increase based on the number of lines cleared simultaneously.

---

### User Story 3 - Game Over and Progression (Priority: P2)

As a player, I want the game to end when blocks reach the top of the board and be able to see the next block so I can plan my moves.

**Why this priority**: Defines the boundaries of the game session and provides strategic depth.

**Independent Test**: Can be tested by letting blocks stack to the top and verifying the game stops, and by checking the "Next Piece" display during play.

**Acceptance Scenarios**:

1. **Given** a new tetromino is spawned, **When** its spawn position is already occupied by existing blocks, **Then** the game should enter a "Game Over" state.
2. **Given** the game is active, **When** a tetromino is currently falling, **Then** the UI should display a preview of the tetromino that will spawn next.

---

### Edge Cases

- **Collision at Board Edge**: What happens when a user tries to move or rotate a piece against the board boundary?
- **Fast Drop**: How does the system handle a "Hard Drop" or "Soft Drop" input where the piece moves down faster?
- **Simultaneous Line Clears**: How does the scoring handle clearing 1, 2, 3, or 4 lines at once?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST spawn one of the 7 standard tetromino types (I, J, L, O, S, T, Z) at the top-center of the playfield.
- **FR-002**: The system MUST allow users to move the active tetromino horizontally (left/right).
- **FR-003**: The system MUST allow users to rotate the active tetromino 90 degrees.
- **FR-004**: The system MUST automatically move the active tetromino down by one row at a configurable time interval (gravity).
- **FR-005**: The system MUST detect when a horizontal row is completely filled with blocks.
- **FR-006**: The system MUST remove full rows and shift all blocks above the cleared row down by one position.
- **FR-007**: The system MUST maintain a score that increases when lines are cleared.
- **FR-008**: The system MUST display the current score on the UI.
- **FR-009**: The system MUST display a preview area showing the next tetromino to be spawned.
- **FR-010**: The system MUST trigger a Game Over state when a new tetromino cannot be placed at the spawn position.

### Key Entities *(include if feature involves data)*

- **Playfield**: A 2D grid representing the game area (typically 10x20).
- **Tetromino**: An object representing a shape, its orientation, and its current coordinates.
- **Game State**: Manages the current score, level, game status (Running, Paused, Game Over), and the next piece queue.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of standard tetromino shapes (7 types) spawn and rotate correctly according to standard Tetris rules.
- **SC-002**: Input latency for movement and rotation is under 50ms to ensure a responsive "arcade" feel.
- **SC-003**: Line clearing logic correctly handles 4 simultaneous lines (a "Tetris") and updates the score accurately.
- **SC-004**: The game reliably enters the Game Over state when blocks reach the top boundary, preventing further play until restart.

## Assumptions

- **Controls**: Standard keyboard inputs (Arrow keys or WASD) are assumed for PC, or on-screen buttons for mobile.
- **Grid Size**: A standard 10x20 grid is used for the playfield.
- **Scoring**: A standard scoring system (e.g., 100 for 1 line, 300 for 2, 500 for 3, 800 for 4) is assumed unless specified otherwise.
- **Speed**: The game speed increases as the score/level increases (optional but standard).
