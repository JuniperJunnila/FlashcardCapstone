import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../../utils/api";

//TO DO

const DeckView = () => {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  // sets the deck
  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      if (response) setDeck(response);
    }
    getDeck();
  }, [deckId]);
  // return null until the deck variable is populated
  if (!deck.id) return null;

  const cards = deck.cards;

  const deleteDeckHandler = async (deckId) => {
    if (window.confirm("Do you really want to delete?")) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  const deleteCardHandler = async (cardId) => {
    if (window.confirm("Do you really want to delete?")) {
      await deleteCard(cardId);
      window.location.reload();
    }
  };

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
          <h5>{deck.name}</h5>
        </nav>
        <div className="row justify-content-center mt-3 pt-3 border border-bottom-0 rounded">
          <h2>
            <strong>{deck.name}</strong>
          </h2>
        </div>
        <div className="row justify-content-center pt-2 border-left border-right">
          <p className="text-muted">{deck.description}</p>
        </div>
      </div>
    );
  };

  const PageButtons = () => {
    return (
      <div className="row justify-content-center border border-top-0 pb-3 rounded">
        <div className="col ml-3">
          <a href={`/decks/${deck.id}/edit`}>
            <button type="button" className="col btn btn-secondary" id="edit">
              Edit
            </button>
          </a>
        </div>
        <div className="col">
          <a href={`/decks/${deck.id}/study`}>
            <button type="button" className="col btn btn-primary" id="study">
              Study
            </button>
          </a>
        </div>
        <div className="col">
          <a href={`/decks/${deck.id}/cards/new`}>
            <button
              type="button"
              className="col btn btn-primary"
              id="add-cards"
            >
              Add Cards
            </button>
          </a>
        </div>
        <div className="col mr-3 mb-1">
          <button
            type="button"
            className="col btn btn-danger"
            id="delete"
            onClick={() => deleteDeckHandler(deck.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  const CardDisplay = () => {
    if (cards.length === 0) return null;
    return (
      <div>
        <h3 className="row justify-content-center mt-5">Cards</h3>
        <div className="row mb-5">
          <ul className="col">
            {cards.map((card) => {
              return (
                <li key={cards.indexOf(card)} className="card m-2">
                  <div className="card-header">
                    <p className="float-left text-muted">{deck.name}</p>
                    <p className="float-right text-muted">
                      {cards.indexOf(card) + 1} / {cards.length}
                    </p>
                  </div>
                  <div className="card-body">
                    <div className="row justify-content-center">
                      <h5 className="col">Question:</h5>
                      <p className="col text-muted">{card.front}</p>
                    </div>
                    <div className="row justify-content-center">
                      <h5 className="col text-muted">Answer:</h5>
                      <p className="col text-muted">{card.back}</p>
                    </div>
                  </div>
                  <div className="card-footer">
                    <a href={`/decks/${deck.id}/cards/${card.id}/edit`}>
                      <button className="col-1 btn btn-secondary">Edit</button>
                    </a>
                    <button
                      className="col-1 btn btn-danger float-right"
                      onClick={() => deleteCardHandler(card.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div>
      <NavBar />
      <PageButtons />
      <CardDisplay />
    </div>
  );
};

export default DeckView;
