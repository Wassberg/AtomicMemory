class Card {
  constructor(id) {
    this._id = id;
    this._element = $("<div/>", {
      class: `${CARD_CLASS}`,
      id: `card-${this._id}`
    });
  }

  init() {
    this._suit = "";
    this._value = "";
    this._matchId = null;
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

  get matchId() {
    return this._matchId;
  }
  set matchId(id) {
    this._matchId = id;
  }

  hasMatch() {
    return Boolean(this._matchId);
  }

  isSet() {
    return Boolean(this._value && this._suit);
  }

  isActive() {
    return Boolean(this._value || this._suit);
  }

  match(card) {
    if (this._id != card.id && this.isSet()) {
      if (this._value == card.value && this._suit == card.suit) {
        console.log("Match found!");
        this._matchId = card.id;
        card.matchId = this._matchId;
      }
    }
  }
}
