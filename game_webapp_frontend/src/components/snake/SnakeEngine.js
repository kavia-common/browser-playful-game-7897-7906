//
// PUBLIC_INTERFACE
// SnakeEngine
// A modular game engine for the classic Snake game. Handles grid, snake movement,
// food spawning, collisions, and tick updates. Pure logic with no rendering.
// Designed to be used by a React component and future persistence layers.
//
export class SnakeEngine {
  /**
   * Create a new SnakeEngine.
   * @param {Object} options
   * @param {number} options.cols - Number of columns in the grid.
   * @param {number} options.rows - Number of rows in the grid.
   * @param {number} options.speedMs - Initial tick interval in milliseconds.
   * @param {(state: SnakeState) => void} options.onChange - Callback invoked on state change.
   */
  constructor({ cols = 20, rows = 20, speedMs = 160, onChange = () => {} } = {}) {
    this.cols = cols;
    this.rows = rows;
    this.speedMs = speedMs;
    this.onChange = onChange;

    this._timer = null;
    this.reset();
  }

  /** Reset game to initial state. */
  reset() {
    // Start snake at center with length 3 moving to the right.
    const startX = Math.floor(this.cols / 2);
    const startY = Math.floor(this.rows / 2);
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 }; // buffered direction from input, applied per tick
    this.snake = [
      { x: startX - 2, y: startY },
      { x: startX - 1, y: startY },
      { x: startX, y: startY },
    ];
    this.score = 0;
    this.alive = true;
    this.food = this._spawnFood();
    this._emit();
  }

  /** Start ticking. */
  start() {
    if (this._timer) return;
    this._timer = setInterval(() => this._tick(), this.speedMs);
    this._emit();
  }

  /** Stop ticking (pause). */
  stop() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
      this._emit();
    }
  }

  /** Is the engine running (ticking)? */
  isRunning() {
    return !!this._timer;
  }

  /** Get current immutable state snapshot for rendering. */
  getState() {
    return Object.freeze({
      cols: this.cols,
      rows: this.rows,
      snake: [...this.snake],
      food: { ...this.food },
      score: this.score,
      alive: this.alive,
      running: this.isRunning(),
      speedMs: this.speedMs,
    });
  }

  /**
   * PUBLIC_INTERFACE
   * setDirection
   * Request a direction change. Prevents reversing directly into itself.
   * @param {'up'|'down'|'left'|'right'} dir
   */
  setDirection(dir) {
    if (!this.alive) return;
    const map = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
    };
    const nd = map[dir];
    if (!nd) return;

    // Prevent direct reverse
    if (this.direction && this.direction.x + nd.x === 0 && this.direction.y + nd.y === 0) {
      return;
    }
    this.nextDirection = nd;
  }

  /** Internal: one game tick - move snake, handle collisions and growth. */
  _tick() {
    if (!this.alive) return;
    // Apply buffered direction for this tick
    this.direction = this.nextDirection;

    const head = this.snake[this.snake.length - 1];
    const newHead = { x: head.x + this.direction.x, y: head.y + this.direction.y };

    // Check wall collisions
    if (newHead.x < 0 || newHead.x >= this.cols || newHead.y < 0 || newHead.y >= this.rows) {
      this._gameOver();
      return;
    }

    // Check self collisions
    if (this.snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
      this._gameOver();
      return;
    }

    // Move snake
    this.snake.push(newHead);

    // Food eaten
    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      this.score += 1;
      this.food = this._spawnFood();
      // Optional: increase speed slightly as score grows (cap to avoid too fast)
      if (this.speedMs > 80 && this.score % 4 === 0) {
        this._setSpeed(this.speedMs - 8);
      }
    } else {
      // No food: remove tail
      this.snake.shift();
    }

    this._emit();
  }

  /** Internal: emit state changes. */
  _emit() {
    try {
      this.onChange(this.getState());
    } catch (e) {
      // ignore errors from listeners
    }
  }

  /** Internal: set new tick speed and restart interval if running. */
  _setSpeed(ms) {
    this.speedMs = ms;
    const wasRunning = this.isRunning();
    this.stop();
    if (wasRunning) this.start();
  }

  /** Internal: spawn food on a free cell. */
  _spawnFood() {
    const occupied = new Set(this.snake.map((s) => `${s.x},${s.y}`));
    const freeCells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const key = `${x},${y}`;
        if (!occupied.has(key)) freeCells.push({ x, y });
      }
    }
    if (freeCells.length === 0) {
      // Win state (filled the board)
      return { x: -1, y: -1 };
    }
    const idx = Math.floor(Math.random() * freeCells.length);
    return freeCells[idx];
  }

  /** Internal: handle game over. */
  _gameOver() {
    this.alive = false;
    this.stop();
    this._emit();
  }
}
