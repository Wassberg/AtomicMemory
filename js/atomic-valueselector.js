class valueSelector {
  constructor() {
    this._values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    this._element = $("<div/>").addClass("sel-menu");
    this._items = [];
    this._values.forEach(el => {
      this._items.push($("<span/>").html(el));
      this._element.append(this._items);
    });
    this._parentCard = null;
  }

  get domElement() {
    return this._element;
  }

  isActive() {
    return this._parentCard != null ? true : false;
  }

  appendTo(card) {
    this._parent = card.domElement;
    this._parent.append(this._element);
    this._items.forEach(el => {
      el.click(e => {
        var value = $(e.currentTarget).html();
        card.value = value;
        card.domElement
          .removeClass("card-active card-unset")
          .addClass("card-set");
        this._parent.find(".card-value").remove();
        this._parent.append(
          $("<span/>")
            .html(value)
            .addClass("card-value")
        );
        this._parent.append(
          $("<i/>")
            .addClass("far fa-times-circle fa-xs trash")
            .click(e => {
              resetCard(card);
            })
        );
        this._parent.find(this._element).remove();
        this._parent = null;
      });
    });
  }
}
