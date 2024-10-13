let playerScore = 0;
let opponentScore = 0;
let currentPlayer = 1;
let player1Choice = '';
let player2Choice = '';

function startGame() {
  const playerCount = document.getElementById('playerCount').value;
  const gameArea = document.getElementById('gameArea');
  const gameInstructions = document.getElementById('gameInstructions');
  const resetBtn = document.getElementById('resetBtn');
  
  gameArea.classList.remove('hidden');
  resetBtn.classList.add('hidden');
  document.getElementById('result').innerHTML = ''; // Clear previous result

  if (playerCount === '1') {
    gameInstructions.innerHTML = 'You are playing against the computer. Choose Stone, Paper, or Scissor:';
  } else {
    gameInstructions.innerHTML = 'Player 1, make your choice:';
  }
  
  currentPlayer = 1;  // Reset to Player 1's turn
}

function makeChoice(choice) {
  const playerCount = document.getElementById('playerCount').value;

  if (playerCount === '1') {
    // Single-player mode (Player vs Computer)
    const choices = ['stone', 'paper', 'scissor'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    
    let resultMessage = `You chose ${choice}. Computer chose ${computerChoice}. `;
    resultMessage += determineWinner(choice, computerChoice);
    
    document.getElementById('result').innerHTML = resultMessage;
  } else {
    // Two-player mode
    if (currentPlayer === 1) {
      player1Choice = choice;
      document.getElementById('gameInstructions').innerHTML = 'Player 2, make your choice:';
      currentPlayer = 2;
    } else if (currentPlayer === 2) {
      player2Choice = choice;
      document.getElementById('gameInstructions').innerHTML = 'Results:';
      
      // Reveal both players' choices
      let resultMessage = `Player 1 chose ${player1Choice}. Player 2 chose ${player2Choice}. `;
      resultMessage += determineWinner(player1Choice, player2Choice);
      
      document.getElementById('result').innerHTML = resultMessage;
      currentPlayer = 1;  // Reset to Player 1's turn for the next round
    }
  }
  
  updateScore();
  document.getElementById('resetBtn').classList.remove('hidden');  // Show reset button
}

function determineWinner(choice1, choice2) {
  if (choice1 === choice2) {
    return "It's a draw!";
  } 
  if ((choice1 === 'stone' && choice2 === 'scissor') ||
      (choice1 === 'paper' && choice2 === 'stone') ||
      (choice1 === 'scissor' && choice2 === 'paper')) {
    playerScore++;
    return "Player 1 wins!";
  } else {
    opponentScore++;
    return "Player 2 wins!";
  }
}

function updateScore() {
  document.getElementById('playerScore').innerHTML = playerScore;
  document.getElementById('opponentScore').innerHTML = opponentScore;
}

function resetGame() {
  playerScore = 0;
  opponentScore = 0;
  updateScore();
  document.getElementById('gameInstructions').innerHTML = '';
  document.getElementById('result').innerHTML = '';
  document.getElementById('gameArea').classList.add('hidden');
}
