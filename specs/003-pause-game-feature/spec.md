# Feature Specification: Pause Game Feature

**Feature Branch**: `003-pause-game-feature`  
**Created**: 2026-05-04  
**Status**: Draft  
**Input**: User description: "ESC 키를 누르면 게임이 일시 정지되고, 다시 ESC 키를 누르면 게임이 재개되는 기능을 추가해. 일시 정지 상태일 경우 블럭이 멈추고 화면에 \"PAUSED\" 표시가 나타나야 해."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Toggling Pause with ESC Key (Priority: P1)

As a player, I want to be able to pause and resume the game using the ESC key so that I can manage my playtime.

**Why this priority**: Core functionality requested. Essential for the "Pause" feature to work.

**Independent Test**: Can be tested by starting a game, pressing ESC to pause (verifying blocks stop), and pressing ESC again to resume (verifying blocks continue).

**Acceptance Scenarios**:

1. **Given** a game is in progress, **When** the player presses the ESC key, **Then** the game status changes to "PAUSED", block movement stops, and a "PAUSED" message appears.
2. **Given** the game is paused, **When** the player presses the ESC key, **Then** the game status changes back to "PLAYING", block movement resumes, and the "PAUSED" message disappears.

---

### User Story 2 - Interaction Lock during Pause (Priority: P2)

As a player, I want to ensure that I cannot move or rotate blocks while the game is paused so that the game state remains frozen.

**Why this priority**: Prevents unintended actions or "cheating" while the game is stopped.

**Independent Test**: Can be tested by pausing the game and attempting to use arrow keys or space bar to move/rotate the block. No changes should occur on the board.

**Acceptance Scenarios**:

1. **Given** the game is paused, **When** the player presses movement keys (Left, Right, Down, Up, Space), **Then** no change occurs to the active piece position or rotation.

---

### User Story 3 - Visual Feedback of Paused State (Priority: P2)

As a player, I want to see a clear "PAUSED" indicator when the game is stopped so that I am certain the game is not frozen due to a bug.

**Why this priority**: Crucial for user experience and clarity of state.

**Independent Test**: Can be tested by observing the screen immediately after pressing ESC to pause.

**Acceptance Scenarios**:

1. **Given** the game is paused, **Then** an overlay with the text "PAUSED" is displayed prominently on the screen.

---

### Edge Cases

- **ESC during Game Over**: What happens when ESC is pressed while the "GAME OVER" screen is shown?
  - *Assumption*: ESC should have no effect or should behave according to standard UI (e.g., close the overlay if applicable, but not pause a finished game).
- **Losing Focus**: How does the system handle the window losing focus (e.g., switching tabs)?
  - *Assumption*: While not explicitly requested, standard behavior would be to pause automatically, but for this specific feature, we focus on the ESC key toggle.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST toggle between "PLAYING" and "PAUSED" states when the ESC key is pressed.
- **FR-002**: System MUST stop the falling block interval timer when in "PAUSED" state.
- **FR-003**: System MUST ignore all game control inputs (ArrowLeft, ArrowRight, ArrowDown, ArrowUp, Space) when in "PAUSED" state.
- **FR-004**: System MUST display a "PAUSED" message overlay when the game state is "PAUSED".
- **FR-005**: System MUST hide the "PAUSED" message overlay when the game state is "PLAYING".

### Key Entities

- **GameStatus**: Represents the current state of the game (PLAYING, PAUSED, GAME_OVER).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Toggling pause/resume via ESC key happens instantaneously (under 100ms response).
- **SC-002**: The "PAUSED" message is clearly visible to 100% of users when the state is active.
- **SC-003**: 0% change in block position or rotation occurs while the game is in the "PAUSED" state despite user input.

## Assumptions

- The ESC key is the designated toggle for pausing and resuming.
- The "PAUSED" message will be displayed as an overlay centered over the game board.
- The game board remains visible behind the "PAUSED" overlay (i.e., it is not hidden to prevent move planning).
- Pressing ESC while the game is already in a state like "GAME_OVER" will not trigger a pause.
