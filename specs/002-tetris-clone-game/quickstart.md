# Quickstart: Tetris Clone Game

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn

## Setup Instructions

1. **Initialize Project**:
   ```bash
   npm create vite@latest . -- --template react-ts
   npm install
   ```

2. **Add Testing (Vitest)**:
   ```bash
   npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
   ```

3. **Directory Structure**:
   Create the following directories under `src/`:
   ```bash
   mkdir src/logic src/components src/hooks src/styles src/types tests
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Run Tests**:
   ```bash
   npx vitest
   ```

## Development Workflow
- **Logic First**: Implement and test game functions in `src/logic/`.
- **UI Components**: Build UI in `src/components/` using Pure CSS in `src/styles/`.
- **Hooks**: Use `src/hooks/` to connect logic to React state.
