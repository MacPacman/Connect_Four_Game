
var player1 = prompt('Player 1: Enter your name!')
var player1color = 'rgb(66, 134, 244)'
var player2 = prompt('Player 2: Enter your name!')
var player2color = 'rgb(244, 46, 79)'
var table = $('tr')

function gameWin(rowNum,colNum) {
  console.log('You won the game at row,col');
  console.log(rowNum);
  console.log(colNum);
}
function changecolor(rowIndex,colIndex,color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color)
}
function reportcolor(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color')
}
function checkbottom(colIndex){
  var colorReport = reportcolor(5,colIndex)
  for (var row = 5; row > -1; row--) {
    colorReport = reportcolor(row,colIndex)
      if (colorReport === 'rgb(128, 128, 128)') {
        return row
      }
  }
}
function colormatchCheck(one,two,three,four) {
  return (one===two && one===two && one===three && one===four && one!=='rgb(128, 128, 128)' && one!==undefined)
}
// Horizontal win check
function HoriCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 3; col++) {
      if (colormatchCheck(reportcolor(row,col),reportcolor(row,col+1),reportcolor(row,col+2))) {
        console.log('Horizontal Win!');
        gameWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}
//Vertical Win
function VerWin() {
  for (var col = 0; col < 6; col++) {
    for (var row = 0; row < 3; row++) {
      if (colormatchCheck(reportcolor(row,col),reportcolor(row+1,col),reportcolor(row+2,col))) {
        console.log('vertical win!');
        gameWin(row,col)
        return true
      }else {
        continue
      }
    }
  }
}

// Diagonal win
function DiagonalWin() {
  for (var col=0;col < 5;col++) {
    for (var row = 0; row < 6; row++) {
      if (colormatchCheck(reportcolor(row,col),reportcolor(row+1,col+1),reportcolor(row+2,col+2),reportcolor(row+3,col+3))) {
        console.log('Horizontal Win!');
        gameWin(row,col)
        return true
      }else if (colormatchCheck(reportcolor(row,col),reportcolor(row-1,col+1),reportcolor(row-2,col+2),reportcolor(row-3,col+3))) {
        console.log('Horizontal Win!');
        gameWin(row,col)
        return true
      }else {
        continue
      }
    }
  }
}
// Game Play Logic
var currentplayer = 1
var currentname = player1
var currentcolor = player1color
$('h3').text(player1+' :Its  your turn to drop a chip!')

$('button').on('click',function() {
  var col = $(this).closest('td').index();
  var bottomavail = checkbottom(col)
  changecolor(bottomavail,col,currentcolor)
  if (HoriCheck()||VerWin()||DiagonalWin()) {
    for (var col = 0; col < 6; col++) {
      for (var row = 0; row < 6;row++) {
        $('h1').text(currentname+' :Has won the game.');
        $('h2').fadeOut('fast');
        $('h3').fadeOut('fast');
      }
    }
  }
  currentplayer = currentplayer*-1;
  if (currentplayer === 1) {
    currentname = player1
    currentcolor = player1color
    $('h3').text(currentname+' it is your trun.')
  }else {
    currentname = player2
    currentcolor = player2color
    $('h3').text(currentname+' it is your turn.')
  }
})
