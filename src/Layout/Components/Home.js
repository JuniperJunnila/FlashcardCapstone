import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../../utils/api";

const Home = () => {
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    async function getDecks() {
      const response = await listDecks();
      setDecks(response);
    }
    getDecks();
  }, []);

  const deleteHandler = async (deckId) => {
    if (window.confirm("Do you really want to delete?")) {
      await deleteDeck(deckId);
      window.location.reload()
    }
  };

  // if decks isn't populated, return null until it is
  if (decks.length === 0) return null;

  return (
    <div>
      <Link to="/decks/new">
      <button
        type="button"
        className="btn btn-primary btn-lg col-4"
        style={{ marginBottom: "5px" }}
      >
        Create Deck
      </button></Link>
      {decks.map((deck) => {
        return (
          <div className="card mb-1" key={`deck${deck.id}`}>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h2 className="card-title">{deck.name}</h2>
                </div>
                <div className="col-2">
                  <p className="float-right">{deck.cards.length} cards</p>
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <Link to={`/decks/${deck.id}/study`}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg mr-1"
                  >
                    Study
                  </button></Link>
                  <Link to={`/decks/${deck.id}`}>
                    <button
                      type="button"
                      className="btn btn-primary btn-lg mr-1"
                    >
                      View
                    </button>
                  </Link>{" "}
                </div>
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-danger btn-lg float-right"
                    onClick={() => deleteHandler(deck.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
