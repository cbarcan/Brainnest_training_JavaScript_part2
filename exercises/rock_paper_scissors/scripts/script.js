// Global variables
let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;
const header = document.createElement("header");
const main = document.createElement("div");
const title = document.createElement("h1");
const round = document.createElement("h3");
const score = document.createElement("h3");
const result = document.createElement("h3");
const rockButton = document.createElement("button");
const paperButton = document.createElement("button");
const scissorsButton = document.createElement("button");
const playAgainButton = document.createElement("button");

// Function that capitalizes the first letter
const capitalizeFirstLetter = string => (string && string[0].toUpperCase() + string.slice(1)) || ""

// Function where computer chooses random between rock, paper and scissors
const computerPlay = () => {
  let random = Math.floor(Math.random() * 3);
  switch (random) {
    case 0:
      return "rock"
    case 1:
      return "paper"
    default:
      return "scissors"
  }
}

// Function that plays one round until someone reaches 5 points then the game ends and you get a play again button
const playRound = (playerSelection, computerSelection) => {
  roundNumber++;
  round.textContent = `Round ${roundNumber}`;
  if (playerSelection === computerSelection) {
    result.textContent = "This round is a draw!";
    score.textContent = `Player ${playerScore} : ${computerScore} Computer`;
  } else if (
    playerSelection === "rock" && computerSelection === "paper" ||
    playerSelection === "paper" && computerSelection === "scissors" ||
    playerSelection === "scissors" && computerSelection === "rock"
  ) {
    computerScore++;
    result.textContent = `You lose this round! ${capitalizeFirstLetter(computerSelection)} beats ${capitalizeFirstLetter(playerSelection)}.`;
    score.textContent = `Player ${playerScore} : ${computerScore} Computer`;
  } else {
    playerScore++;
    result.textContent = `You win this round! ${capitalizeFirstLetter(playerSelection)} beats ${capitalizeFirstLetter(computerSelection)}.`;
    score.textContent = `Player ${playerScore} : ${computerScore} Computer`;
  }
  if (playerScore === 5 || computerScore === 5) {
    result.textContent = `${playerScore === 5 ? "You WIN!" : "You LOSE!"}`
    main.removeChild(round);
    main.removeChild(rockButton);
    main.removeChild(paperButton);
    main.removeChild(scissorsButton);
    playAgainButton.textContent = "Play again?";
    playAgainButton.setAttribute("style",`
    height: 30px;
    width: 150px;
    font-size: 18px;
    margin: 0 10px 0 10px;
    cursor: pointer;
    `);
    main.appendChild(playAgainButton);
    playAgainButton.addEventListener("click", playAgain, { once: true });
  }
}

//Functions used so that I can removeEventListener
const playRock = () => playRound("rock", computerPlay());
const playPaper = () => playRound("paper", computerPlay());
const playScrissors = () => playRound("scissors", computerPlay());

// Function for playing one game
const game = () => {
  title.textContent = "Rock Paper Scissors!";
  result.textContent = "You play until one of you gets to 5.";
  score.textContent = "Select Rock, Paper or Scissors to start!";
  rockButton.textContent = "Rock";
  paperButton.textContent = "Paper";
  scissorsButton.textContent = "Scissors";
  document.body.setAttribute("style", "background-color: whitesmoke;");
  title.setAttribute("style", "margin: 50px 0 70px 10px");
  result.setAttribute("style", "margin-left: 10px;");
  score.setAttribute("style", "margin-left: 10px;");
  rockButton.setAttribute("style",`
  height: 30px;
  width: 90px;
  font-size: 18px;
  margin: 0 10px 0 10px;
  cursor: pointer;
  `);
  paperButton.setAttribute("style",`
  height: 30px;
  width: 90px;
  font-size: 18px;
  margin: 0 10px 0 10px;
  cursor: pointer;
  `);
  scissorsButton.setAttribute("style",`
  height: 30px;
  width: 90px;
  font-size: 18px;
  margin: 0 10px 0 10px;
  cursor: pointer;
  `);
  document.body.appendChild(header);
  document.body.appendChild(main);
  header.appendChild(title);
  main.appendChild(round);
  main.appendChild(result);
  main.appendChild(score);
  main.appendChild(rockButton);
  main.appendChild(paperButton);
  main.appendChild(scissorsButton);
  rockButton.addEventListener("click", playRock);
  paperButton.addEventListener("click", playPaper);
  scissorsButton.addEventListener("click", playScrissors);
}

//Function for playing again
const playAgain = () => {
  playerScore = 0;
  computerScore = 0;
  roundNumber = 0;
  round.textContent = "";
  main.removeChild(playAgainButton);
  rockButton.removeEventListener("click", playRock);
  paperButton.removeEventListener("click", playPaper);
  scissorsButton.removeEventListener("click", playScrissors);
  game();
}

game();
