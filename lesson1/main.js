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
    historyContainer.innerText = chessBoard.activeAddress;
    if (activeCell) {
      activeCell.classList.remove('active');
    }
    activeCell = document.getElementById(chessBoard.activeAddress);
    activeCell.classList.add('active');
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
      element.id = '' + i + LETTERS[j-1];
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
    
    var activeCellId = activeCell.id;
    var activeI = +activeCellId[0];
    var activeJ = LETTERS.indexOf(activeCellId[1]) + 1;
    
    if (event.keyCode === 37) { // left
      activeJ -= 1;
      if (activeJ === 0) {
        activeJ = 8;
      }
    } else if (event.keyCode === 38) { // top
      activeI -= 1;
      if (activeI === 0) {
        activeI = 8;
      }
    } else if (event.keyCode === 39) { // right
      activeJ += 1;
      if (activeJ === 9) {
        activeJ = 1;
      }
    } else if (event.keyCode === 40) { // bottom
      activeI += 1;
      if (activeI === 9) {
        activeI = 1;
      }
    }
    setActiveCell(activeI, activeJ);
  });

  chessBoard.addEventListener = function() {
    container.addEventListener.apply(container, arguments);
  };
}

var chessBoard1 = new ChessBoard(document.getElementById('chessContainer'));

// открытые свойства:
// 1 activeAddress - для получения активного адреса ячейки
// открытые методы:
// 1 setActiveAddress - для установки активной ячейки
// 2 addEventListener - для подписки на события
// остальные методы и свойства скрыты т.к. не нужны для работы с объектом шахматной доски