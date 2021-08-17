import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateCard } from "../../utils/api";
import CardForm from "./CardForm";

const EditCard = () => {
  const history = useHistory()
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [formInput, setFormInput] = useState({})

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

  const card = deck.cards.find((card) => card.id === parseInt(cardId))

  if(formInput.front === undefined) setFormInput({...card})

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
    const cardUpdate = async () => {
      const updated = await updateCard(formInput);
      if (updated) {
        history.push(`/decks/${deckId}/`)
      }
    };
    cardUpdate();
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
          <h5>Edit Card {card.id}</h5>
        </nav>
        <div className="row justify-content-center mt-3">
          <h2>
            <strong>Edit Card</strong>
          </h2>
        </div>
      </div>
    );
  };

  return (
    <div>
      <NavBar />
      <CardForm submitHandler={submitHandler} formInput={formInput} enterText={enterText} history={history} deckId={deckId} />
    </div>
  );
};

export default EditCard;
