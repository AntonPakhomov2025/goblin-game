export class ScoreTracker {
  constructor(scoreEl, missedEl) {
    this.scoreEl = scoreEl;
    this.missedEl = missedEl;
    this.score = 0;
    this.missed = 0;
    this.render();
  }

  addHit() {
    this.score += 1;
    this.render();
  }

  addMiss() {
    this.missed += 1;
    this.render();
  }

  reset() {
    this.score = 0;
    this.missed = 0;
    this.render();
  }

  render() {
    this.scoreEl.textContent = this.score;
    this.missedEl.textContent = this.missed;
  }
}
