import { GameField } from "./GameField";
import { Goblin } from "./Goblin";
import { ScoreTracker } from "./ScoreTracker";

export class Game {
  constructor() {
    this.field = new GameField(document.getElementById("game-field"));
    this.tracker = new ScoreTracker(
      document.querySelector(".score-value"),
      document.querySelector(".missed-value")
    );
    this.goblin = new Goblin(this.field);
    this.gameOverEl = document.getElementById("game-over");
    this.restartBtn = document.getElementById("restart-btn");
    this.finalScoreEl = document.querySelector(".final-score");
    this.timeoutId = null;
    this.active = false;

    this.restartBtn.addEventListener("click", () => this.start());
  }

  start() {
    this.active = true;
    this.tracker.reset();
    this.gameOverEl.classList.add("hidden");
    this.restartBtn.classList.add("hidden");
    this.field.clear();
    this.scheduleNext();
  }

  scheduleNext() {
    if (!this.active) return;
    this.timeoutId = setTimeout(async () => {
      if (!this.active) return;
      const hit = await this.goblin.appear();
      if (hit) {
        this.tracker.addHit();
      } else {
        this.tracker.addMiss();
        if (this.tracker.missed >= 5) {
          this.end();
          return;
        }
      }
      this.scheduleNext();
    }, 300);
  }

  end() {
    this.active = false;
    clearTimeout(this.timeoutId);
    this.field.clear();
    this.finalScoreEl.textContent = this.tracker.score;
    this.gameOverEl.classList.remove("hidden");
    this.restartBtn.classList.remove("hidden");
  }
}
