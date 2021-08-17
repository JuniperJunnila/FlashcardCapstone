import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";

const Study = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  // sets the deck
  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      if (response) setDeck(response);
    }
    getDeck();
  }, []);
  // return null until the deck variable is populated
  if (!deck.id) return null;

  const cards = deck.cards;

  const NavBar = () => {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light nav-flex"
          style={{ width: "100%" }}
        >
          <a className="navbar-brand text-primary" href="/">
            <h5>Home</h5>
          </a>
          <h5 className="mr-3">/</h5>
          <a className="navbar-brand text-primary" href={`/decks/${deck.id}`}>
            <h5>{deck.name}</h5>
          </a>
          <h5 className="mr-3">/</h5>
          <h5>Study</h5>
        </nav>
        <div className="row justify-content-center mt-3">
          <h2>
            <strong>Study: {deck.name}</strong>
          </h2>
        </div>
      </div>
    );
  };

  const CardDisplay = () => {
    const defaultCD = {
      flipped: false,
      cardNumber: 0,
    };
    const [cardState, setCardState] = useState(defaultCD);
    const { flipped, cardNumber } = cardState;

    const nextHandler = () => {
      if (cardNumber < cards.length - 1) {
        setCardState({ flipped: false, cardNumber: cardNumber + 1 });
      } else {
        if (window.confirm("Restart cards?")) setCardState(defaultCD);
      }
    };

    const FaceUp = () => {
      if (!flipped) {
        return cards[cardNumber].front;
      } else {
        return cards[cardNumber].back;
      }
    };

    const Buttons = () => {
      return flipped ? (
        <div>
          <button
            type="button"
            className="btn btn-secondary btn-lg m-2"
            onClick={() => setCardState({ ...cardState, flipped: !flipped })}
          >
            Flip
          </button>

          <button
            type="button"
            disabled={!flipped}
            className="btn btn-primary btn-lg m-2"
            onClick={nextHandler}
          >
            Next
          </button>
        </div>
      ) : (<div>
        <button
          type="button"
          className="btn btn-secondary btn-lg m-2"
          onClick={() => setCardState({ ...cardState, flipped: !flipped })}
        >
          Flip
        </button></div>
      );
    };

    return (
      <div>
        <h3>
          Card {cardNumber + 1} of {cards.length}
        </h3>
        <h5>
          <FaceUp />
          <Buttons />
        </h5>
      </div>
    );
  };

  const RenderCard = () => {
    if (deck.cards.length <= 2) {
      return (
        <div>
          <h5>
            There are not enough cards; your deck currently has{" "}
            {deck.cards.length}. Please make at least {3 - deck.cards.length}{" "}
            more card(s)!
          </h5>
          <a href={`/decks/${deck.id}/cards/new`}>
            <button className="btn btn-primary">Add Cards</button>
          </a>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="card">
            <div className="card-body">
              <CardDisplay />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <NavBar />
      <RenderCard />
    </div>
  );
};

export default Study;
