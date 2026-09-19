export class Goblin {
  constructor(field) {
    this.field = field;
    this.currentIndex = -1;
    this.visible = false;
    this.hit = false;
    this.missed = false;

    this.field.container.addEventListener("click", (e) => {
      const cell = e.target.closest(".cell");
      if (cell && cell.classList.contains("cell--active") && this.visible) {
        this.hit = true;
        this.field.clear();
        this.visible = false;
      }
    });
  }

  appear() {
    this.hit = false;
    this.missed = false;
    const newIndex = this.field.getRandomIndex(this.currentIndex);
    this.currentIndex = newIndex;
    this.field.showGoblin(newIndex);
    this.visible = true;

    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.visible && !this.hit) {
          this.missed = true;
          this.field.clear();
          this.visible = false;
          resolve(false);
        } else {
          resolve(true);
        }
      }, 1000);
    });
  }
}
