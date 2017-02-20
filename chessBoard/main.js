function ChessBoard(container) {
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  var activeCell = null;
  var chessBoard = this; // mainObject

  var cellsContainer = document.createElement('div');
  var historyContainer = document.createElement('div');
  container.appendChild(cellsContainer);
  container.appendChild(historyContainer);

  chessBoard.activeAddress = null;
  chessBoard.setActiveAddress = function(address) {
    setActiveCell(LETTERS.indexOf(address[1]) + 1, address[0]);
  };
  
  function setActiveCell(i, j) {
    i = +i;
    j = +j;
    chessBoard.activeAddress = '' + LETTERS[j-1] + i;
    historyContainer.innerText = chessBoard.activeAddress;
    if (activeCell) {
      activeCell.classList.remove('active');
    }
    activeCell = document.getElementById(chessBoard.activeAddress);
    activeCell.classList.add('active');
  }

  function addFigure(element, figureType, color) {
    element.classList.remove('white', 'black', 'pown', 'rook', 'knight', 'bishop', 'queen', 'king');
    element.classList.add(figureType);
    element.classList.add(color);
    element.classList.add('figure');
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
      element.classList.add('clickable');
      element.id = '' + LETTERS[j-1] + i;
      element.addEventListener('click', function() {
        setActiveCell(i, j);
      });
    }

    cellsContainer.appendChild(element);
  }

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      addCell(i, j);
    }
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'figures.json', true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status !== 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      var figuresData = JSON.parse(xhr.responseText);
      for (var i = 0; i < figuresData.length; i++) {
        var place = figuresData[i].place;
        if (/^[A-H][1-8]$/.test(place)) {
          var element = document.getElementById(place);
          addFigure(element, figuresData[i].type, figuresData[i].color);
        } else {
          console.log('Invalid place format: ' + place + '\nShould be like A6');
        }
      }
    }

  };

  document.addEventListener('keydown', function(event) {
    if (!activeCell) {
      return;
    }
    
    var activeCellId = activeCell.id;
    var activeI = +activeCellId[1];
    var activeJ = LETTERS.indexOf(activeCellId[0]) + 1;
    
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