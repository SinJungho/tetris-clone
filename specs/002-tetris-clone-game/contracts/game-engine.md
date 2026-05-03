# Game Engine Contract

The game engine is a set of pure functions that manage the Tetris logic independently of React.

## Functions

### `createInitialBoard()`
- **Output**: `Board` (Empty 10x20 grid)

### `spawnPiece()`
- **Output**: `Tetromino` (Randomly selected shape at initial position)

### `movePiece(board, piece, direction)`
- **Input**: `Board`, `Tetromino`, `Direction` (LEFT, RIGHT, DOWN)
- **Output**: `{ piece: Tetromino, success: boolean }`

### `rotatePiece(board, piece)`
- **Input**: `Board`, `Tetromino`
- **Output**: `{ piece: Tetromino, success: boolean }` (Applies SRS if possible)

### `checkLines(board)`
- **Input**: `Board`
- **Output**: `{ board: Board, linesCleared: number }`

### `isGameOver(board, piece)`
- **Input**: `Board`, `Tetromino`
- **Output**: `boolean`
