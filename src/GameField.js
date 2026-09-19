export class GameField {
  constructor(container) {
    this.container = container;
    this.size = 4;
    this.cells = [];
    this.render();
  }

  render() {
    this.container.innerHTML = "";
    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.index = i;
      this.container.appendChild(cell);
      this.cells.push(cell);
    }
  }

  getRandomIndex(excludeIndex = -1) {
    let idx;
    do {
      idx = Math.floor(Math.random() * this.cells.length);
    } while (idx === excludeIndex && this.cells.length > 1);
    return idx;
  }

  showGoblin(index) {
    this.clear();
    this.cells[index].classList.add("cell--active");
  }

  clear() {
    this.cells.forEach((c) => c.classList.remove("cell--active"));
  }
}
