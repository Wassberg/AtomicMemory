/* Constant variables */
const GRID_CLASS = "memory-grid";
const CARD_CLASS = "memory-card";
const GRID_ROWS = 4;
const GRID_COLS = 9;
const GRID_SIZE = GRID_ROWS * GRID_COLS;
const HEARTS_CHAR = "&#9829;";
const DIAMS_CHAR = "&#9830;";
const SPADES_CHAR = "&#9824;";
const CLUBS_CHAR = "&#9827;";

var selectedCard = null;
var cards = [];

function appendSuitSelectors(card) {
  let selectors = [
    $("<span/>", { class: "color-hearts" }).html(HEARTS_CHAR),
    $("<span/>", { class: "color-diamonds" }).html(DIAMS_CHAR),
    $("<span/>", { class: "color-spades" }).html(SPADES_CHAR),
    $("<span/>", { class: "color-clubs" }).html(CLUBS_CHAR)
  ];

  selectors.forEach(el => {
    card.domElement.append(el);
    el.click(e => {
      if (!valSelector.isActive()) {
        let element = $(e.currentTarget);
        console.log(card.id);
        card.domElement.empty().append(element);
        card.suit = element.html();
        if (card.isActive()) {
          card.domElement.removeClass("card-set card-unset");
          card.domElement.addClass("card-active");
        }
        valSelector.appendTo(card);
      }
    });
  });
}

function resetCard(card) {
  card.domElement.empty();
  card.init();
}

var container = $("#memory-container"); // Get the container for the memory game
var memoryGrid = $("<div/>", { class: `${GRID_CLASS}` }); // Create a DOM element of memory grid
container.append(memoryGrid); // Add memory grid to memory container

var valSelector = new valueSelector();

/* Add cards to memory grid depending on grid size */
for (let i = 1; i < GRID_SIZE + 1; i++) {
  let card = new Card(i);
  card.init();
  cards.push(card);
  memoryGrid.append(card.domElement);
}

var playNav = $("<div/>", { id: "play-nav" });
var button = $("<button/>")
  .addClass("atomic-btn play-btn")
  .html("Play")
  .click(e => {
    for (let i = 0; i < cards.length; i++) {
      currentCard = cards[i];
      if (!currentCard.hasMatch()) {
        for (let j = i + 1; j < cards.length; j++) {
          currentCard.match(cards[j]);
          console.log("Matching card " + i + " with card " + j);
        }
      }
    }
    console.log(cards);
  });
playNav.append(button);
container.append(playNav);
