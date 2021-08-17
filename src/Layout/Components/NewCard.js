import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";

const NewCard = () => {
  const history = useHistory();
  const baseForm = {
    front: "",
    back: "",
  };
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [formInput, setFormInput] = useState(baseForm);

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

  //handles form input to make a card
  const enterText = (event) => {
    event.preventDefault();
    const val = event.target.value;
    const inp = event.target.id;
    inp === "card-front"
      ? setFormInput({ ...formInput, front: val })
      : setFormInput({ ...formInput, back: val });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const makeCard = async () => {
      const newCard = await createCard(deck.id, formInput);
      if (newCard) {
        setFormInput(baseForm);
      }
    };
    makeCard();
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
          <a className="navbar-brand text-primary" href={`/decks/${deck.id}`}>
            <h5>{deck.name}</h5>
          </a>
          <h5 className="mr-3">/</h5>
          <h5>Add Card</h5>
        </nav>
        <div className="row justify-content-center mt-3">
          <h2>
            <strong>{deck.name}: Add Card</strong>
          </h2>
        </div>
      </div>
    );
  };

  return (
    <div>
      <NavBar />
      <form className="row justify-content-center" onSubmit={submitHandler}>
        <table className="table col-8 mt-3 border">
          <tbody>
            <tr>
              <th className="col">
                <label htmlFor="card-front">
                  <h4>Front:</h4>
                </label>
              </th>
              <th className="col">
                <textarea
                  value={formInput.front}
                  onChange={enterText}
                  name="card-front"
                  id="card-front"
                />
              </th>
            </tr>
            <tr>
              <th className="col">
                <label htmlFor="card-back">
                  <h4>Back:</h4>
                </label>
              </th>
              <th className="col">
                <textarea
                  value={formInput.back}
                  onChange={enterText}
                  name="card-back"
                  id="card-back"
                />
              </th>
            </tr>
          </tbody>
        </table>
        <div className="col-1 mt-3">
          <div className="row">
            <button
              type="submit"
              className="btn btn-primary col"
              style={{ height: 100 }}
            >
              Save
            </button>
          </div>
          <div className="row" onClick={() => history.push(`/decks/${deckId}`)}>
            <button className="btn btn-secondary col" style={{ height: 100 }}>
              Done
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewCard;
