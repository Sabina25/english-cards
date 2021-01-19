import React from "react";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      id: 0,
      word: "",
      translate: "",
      cards: [],
      overturned: false,
    };
  }

  updateInput(key, value) {
    this.setState({
      [key]: value,
    });
  }

  addCard() {
    const newCard = {
      id: 1 + this.state.id,
      value: {
        word: this.state.word.slice(),
        translate: this.state.translate.slice(),
      },
    };

    this.setState({
      id: newCard.id,
      word: "",
      translate: "",
      cards: [...this.state.cards, newCard],
    });
  }

  turnCard(id) {
    const cards = [...this.state.cards];

    let index = cards.findIndex((card) => card.id === id);

    cards[index].value.overturned = !cards[index].value.overturned;

    this.updateInput("cards", cards);
  }

  render() {
    return (
      <div className="App">
        <h1 className="add-title">Карточки английских слов</h1>
        <div className="container">
          Добюавить карточку...
          <input
            type="text"
            placeholder="Ввведите слово"
            value={this.state.word}
            onChange={(e) => this.updateInput("word", e.target.value)}
          />
          <input
            type="text"
            placeholder="Ввведите слово"
            value={this.state.translate}
            onChange={(e) => this.updateInput("translate", e.target.value)}
          />
          <button className="btn add-btn" onClick={() => this.addCard()}>
            Добавить
          </button>
          <div>
            {this.state.cards.map((card) => {
              return (
                <div
                  key={card.id}
                  className={`card ${
                    card.value.overturned ? "overturned" : ""
                  }`}
                  onClick={() => {
                    this.turnCard(card.id);
                  }}
                >
                  {card.value.overturned
                    ? card.value.translate
                    : card.value.word}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
