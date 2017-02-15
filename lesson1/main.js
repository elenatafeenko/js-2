function ChessBoard(container) {
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  var cells = [];
  var activeCell = null;
  var chessBoard = this; // mainObject

  var cellsContainer = document.createElement('div');
  var historyContainer = document.createElement('div');
  container.appendChild(cellsContainer);
  container.appendChild(historyContainer);

  chessBoard.activeAddress = null;
  chessBoard.setActiveAddress = function(address) {
    setActiveCell(address[0], LETTERS.indexOf(address[1]) + 1);
  };
  
  function setActiveCell(i, j) {
    i = +i;
    j = +j;
    chessBoard.activeAddress = '' + i + LETTERS[j-1];
    historyContainer.innerText += ' ' + chessBoard.activeAddress;
    if (activeCell) {
      activeCell.classList.remove('active');
    }
    for (var k = 0; k < cells.length; k++) {
      if (cells[k].dataset.i == i && cells[k].dataset.j == j) {
        cells[k].classList.add('active');
        activeCell = cells[k];
      }
    }
  }

  function addCell(i, j) {
    var element = document.createElement('div');
    element.className = 'cell';

    var backgroundColor = 'white';
    if ((i+j) % 2 !== 0 && i !== 0 && j !== 0) {
      backgroundColor = 'grey';
    }
    element.style.backgroundColor = backgroundColor;

    if (i === 0) {
      element.innerText = j ? LETTERS[j - 1] : '';
    } else if (j === 0) {
      element.style.clear = 'left';
      element.innerText = i;
    } else {
      if (i === 1 || i === 2 || i === 7 || i === 8) { // figure
        element.classList.add('figure');
        if (i === 2 || i === 7) {
          element.style.backgroundPositionX = '-100px';
        } else if (j === 1 || j === 8) {
          element.style.backgroundPositionX = '-80px';
        } else if (j === 2 || j === 7) {
          element.style.backgroundPositionX = '-60px';
        } else if (j === 3 || j === 6) {
          element.style.backgroundPositionX = '-40px';
        } else if ((j === 4 && i === 1) || (j === 5 && i === 8)) {
          element.style.backgroundPositionX = '-20px';
        }
      }

      element.classList.add('clickable');
      element.dataset.i = i;
      element.dataset.j = j;
      element.addEventListener('click', function() {
        setActiveCell(i, j);
      });
    }

    cells.push(element);
    cellsContainer.appendChild(element);
  }

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      addCell(i, j);
    }
  }

  document.addEventListener('keydown', function(event) {
    if (!activeCell) {
      return;
    }
    if (event.keyCode === 37) { // left
      var i = activeCell.dataset.i;
      var j = activeCell.dataset.j - 1;
      if (j == 0) {
        j = 8;
      }
      setActiveCell(i, j);
    } else if (event.keyCode === 38) { // top
      var i = activeCell.dataset.i - 1;
      var j = activeCell.dataset.j;
      if (i == 0) {
        i = 8;
      }
      setActiveCell(i, j);
    } else if (event.keyCode === 39) { // right
      var i = activeCell.dataset.i;
      var j = +activeCell.dataset.j + 1;
      if (j == 9) {
        j = 1;
      }
      setActiveCell(i, j);
    } else if (event.keyCode === 40) { // bottom
      var i = +activeCell.dataset.i + 1;
      var j = activeCell.dataset.j;
      if (i == 9) {
        i = 1;
      }
      setActiveCell(i, j);
    }
  });

  chessBoard.addEventListener = function() {
    container.addEventListener.apply(container, arguments);
  }

}

var chessBoard1 = new ChessBoard(document.getElementById('chessContainer'));

// открытые свойства:
// 1 activeAddress - для получения активного адреса ячейки
// открытые методы:
// 1 setActiveAddress - для установки активной ячейки
// 2 addEventListener - для подписки на события
// остальные методы и свойства скрыты т.к. не нужны для работы с объектом шахматной доски