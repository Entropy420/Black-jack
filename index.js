let cards = [];
let dealerCards = [];
let sumOfCard;
let dealerSumCard;
let message = "";

let player = {
  name: "Player",
  chips: 500,

  addChips: () => (player.chips += 100),
  substractChips: () => (player.chips -= 100),
  isBroke: () => {
    if (player.chips <= 0) return true;
  },
};

let hasBlackJack = false;
let isAlive = false;

let messageEl = document.getElementById("message-el");
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.querySelector("#cards-el");
let dealerEl = document.querySelector("#dealerCards-el");
let playerEl = document.querySelector("#player-el");

let hitBtnEl = document.getElementById("hit-el");
let startBtnEl = document.getElementById("start-el");
let standEl = document.getElementById("stand-el");

const manageBtn = () => {
  //hides and unhides buttons
  hitBtnEl.hidden = true;
  standEl.hidden = true;
  startBtnEl.hidden = false;
};
manageBtn(); // hides Hit and Stand btn when Js loads

const checkAliveOrBlackJack = () => {
  //check if bust or not
  if (!isAlive || hasBlackJack) manageBtn();
};

const returnRandomCard = () => {
  //returns a random number between 2 and 11(inclusive of both)
  let rngNum = Math.floor(Math.random() * 13 + 1);
  if ([10, 11, 12, 13].indexOf(rngNum) != -1) return 10;
  else if (rngNum === 1) return 11;
  else return rngNum;
};

function initilizeGame() {
  //resets the global variables
  hitBtnEl.hidden = false;
  standEl.hidden = false;
  startBtnEl.hidden = true;
  isAlive = true;
  hasBlackJack = false;

  message = "";
  cards = [returnRandomCard(), returnRandomCard()];
  dealerCards = [returnRandomCard(), returnRandomCard()];
  sumOfCard = cards[0] + cards[1];
  dealerSumCard = dealerCards[0] + dealerCards[1];

  // handles the exception when both cards are Aces, designates one card to 1.
  if (cards[0] === 11 && cards[0] === cards[1]) {
    cards[1] = 1;
    sumOfCard = 12;
  }

  if (dealerCards[0] === 11 && dealerCards[0] === cards[1]) {
    dealerCards[1] = 1;
    dealerSumCard = 12;
  }

  if (sumOfCard == 21) {
    hasBlackJack = true;
    checkAliveOrBlackJack();
  }

  //prints dealers card, with one hidden
  dealerEl.innerHTML = "Dealer's Cards: " + dealerCards[0] + " &nbsp; ?";
}

function startGame() {
  //starts the game
  initilizeGame();
  renderGame();
}

function checkBlackJack() {
  //check for blackJack and updates message
  if (sumOfCard <= 20) {
    message = "Hit = Another Card , Stand = End";
  } else if (sumOfCard === 21) {
    message = "You've Got BlackJack";
    hasBlackJack = true;
    player.addChips();
  } else {
    message = "!!💣 BUST 💣!!";
    isAlive = false;
    player.substractChips();
  }
}

function renderGame() {
  //renders game using DOM objects on html
  checkBlackJack();
  cardsEl.innerHTML = "Your Cards:"; //initilize the cardsEL

  cards.forEach((Element) => {
    cardsEl.innerHTML += " " + Element;
  });

  sumEl.textContent = "Sum: " + sumOfCard;
  messageEl.textContent = message;
  playerEl.textContent = player.name + ": $" + player.chips;
  checkAliveOrBlackJack();
}

function newCard() {
  //adds new card
  let newCard = returnRandomCard();
  cards.push(newCard);
  sumOfCard += newCard;
  renderGame();
}

function endHand() {
  //ends the end, reveals dealer's hidden hand and does necessary updation
  isAlive = false;
  dealerEl.innerHTML =
    "Dealer's Cards: " + dealerCards[0] + " &nbsp; " + dealerCards[1];

  if (dealerSumCard > sumOfCard) {
    message = "Dealer Won, Their Sum is " + dealerSumCard;
    player.substractChips();
  } else {
    message = "!! You Won !!";
    player.addChips();
  }

  messageEl.textContent = message;
  playerEl.textContent = player.name + ": $" + player.chips;
  checkAliveOrBlackJack();
}
