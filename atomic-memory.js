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

class Card {
  constructor(id) {
    this._id = id;
    this._suit;
    this._value;
    this._element = $("<div/>", {
      class: `${CARD_CLASS}`,
      id: `card-${this._id}`
    });
  }

  init() {
    this._suit = "";
    this._value = "";
    this._element.removeClass("card-set card-active");
    this._element.addClass("card-unset");
    appendSuitSelectors(this);
  }

  get id() {
    return this._id;
  }

  get suit() {
    return this._suit;
  }
  set suit(suit) {
    this._suit = suit;
  }

  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
  }

  get domElement() {
    return this._element;
  }

  isSet() {
    return Boolean(this._value && this._suit);
  }

  isActive() {
    return Boolean(this._value || this._suit);
  }
}

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

class valueSelector {
  constructor() {
    this._values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
    this._element = $("<div/>").addClass("sel-menu");
    this._parentCard = null;
  }

  get domElement() {
    return this._element;
  }

  isActive() {
    return this._parentCard != null ? true : false;
  }

  appendTo(card) {
    this._parentElem = card.domElement;
    this._parentElem.append(this._element);

    this._values.forEach(el => {
      let menuItems = $("<span/>").html(el);
      menuItems.click(e => {
        console.log(cards);
        var value = $(e.currentTarget).html();
        card.value = value;
        card.domElement.removeClass("card-active card-unset");
        card.domElement.addClass("card-set");
        this._parentElem.find(".card-value").remove();
        this._parentElem.append(
          $("<span/>")
            .html(value)
            .addClass("card-value")
        );
        this._parentElem.append(
          $("<i/>")
            .addClass("far fa-times-circle fa-xs trash")
            .click(e => {
              resetCard(card);
            })
        );
        this._parentElem.find(this._element).remove();
        this._parentElem = null;
        this._element.empty();
      });
      this._element.append(menuItems);
    });
  }
}

function resetCard(card) {
  card.domElement.empty();
  card.init();
}

var container = $("#memory-container"); // Get the container for the memory game
var memory_grid = $("<div/>", { class: `${GRID_CLASS}` }); // Create a DOM element of memory grid
container.append(memory_grid); // Add memory grid to memory container

var valSelector = new valueSelector();

/* Add cards to memory grid depending on grid size */
for (let i = 1; i < GRID_SIZE + 1; i++) {
  var card = new Card(i);
  card.init();
  cards.push(card);
  memory_grid.append(card.domElement);
}
