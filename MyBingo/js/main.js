"use strict";

{
  // 1列を作成
  function createColumn(col) {
    const source = [];
    for (let i = 0; i < 15; i++) {
      source[i] = i + 1 + 15 * col;
    }
    const column = [];
    for (let i = 0; i < 5; i++) {
      column[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
    }
    return column;
  }

  // 5列分を作成
  function createColumns() {
    const columns = [];
    for (let i = 0; i < 5; i++) {
      columns[i] = createColumn(i);
    }
    columns[2][2] = 'Free';
    return columns;
  }

  // ビンゴカードを作成
  function renderBingo(columns) {
    for (let row = 0; row < 5; row++) {
      const tr = document.createElement('tr');
      for (let col = 0; col < 5; col++) {
        const td = document.createElement('td');
        td.textContent = columns[col][row];
        if (col === 2 && row === 2) {
          td.classList.add('clicked');
        }
        td.classList.add('disabled');
        td.addEventListener('click', () => {
          if (td.classList.contains('disabled')) {
            return;
          } else {
            td.classList.toggle('clicked');
          }
        });
        tr.appendChild(td);
      }
      document.querySelector('tbody').appendChild(tr);
    }
  }

  // 番号を抽選
  function pickNumber() {
    const source = [];
    for (let i = 0; i < 75; i++) {
      source[i] = i + 1;
    }
    const pickedNumber = source.splice(Math.floor(Math.random() * source.length), 1)[0];
    const currentNumber = document.getElementById('currentNumber');
    currentNumber.textContent = pickedNumber;
  }

  // 1. ビンゴカードの作成
  const columns = createColumns();
  renderBingo(columns);

  // 2. 開始・抽選ボタン
  const btn = document.getElementById('btn');
  btn.addEventListener('click', () => {
    document.querySelectorAll('td').forEach(td => {
      if (td.textContent === 'Free') {
        return;
      }
      td.classList.remove('disabled');
    });
    btn.textContent = 'Bingo';
    pickNumber();
  });
}
