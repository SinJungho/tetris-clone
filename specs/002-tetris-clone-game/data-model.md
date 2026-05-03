# Data Model: Tetris Clone Game

## Entities

### Tetromino
Represents a falling piece.
- `shape`: `ShapeType` (I, J, L, O, S, T, Z)
- `position`: `{ x: number, y: number }` (Coordinates on the grid)
- `rotation`: `number` (0, 1, 2, 3 representing 0, 90, 180, 270 degrees)
- `color`: `string` (CSS color or class name)

### Board
The playfield grid.
- `grid`: `(CellContent | null)[][]` (A 10x20 array where each cell is empty or contains a block)
- `width`: `10`
- `height`: `20`

### GameState
Overall state of the game session.
- `activePiece`: `Tetromino | null`
- `nextPiece`: `Tetromino`
- `board`: `Board`
- `score`: `number`
- `level`: `number`
- `linesCleared`: `number`
- `status`: `GameStatus` (PLAYING, PAUSED, GAME_OVER)

## Validation Rules
- **Collision Detection**: A piece cannot move into a position occupied by the board grid or outside the board boundaries.
- **Line Clearing**: A line is cleared if every cell in a row is non-null.
- **Game Over**: Triggered if a new piece cannot be spawned in the initial position without collision.
