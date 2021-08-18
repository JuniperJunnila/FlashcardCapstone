import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

const CreateDeck = () => {
  const history = useHistory();

  const baseForm = {
    name: "",
    description: "",
  };
  const [formInput, setFormInput] = useState(baseForm);

  //handles form input to make a deck
  const enterText = (event) => {
    event.preventDefault();
    const val = event.target.value;
    const inp = event.target.id;
    inp === "deckName"
      ? setFormInput({ ...formInput, name: val })
      : setFormInput({ ...formInput, description: val });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const makeDeck = async () => {
      const newDeck = await createDeck(formInput);
      if (newDeck) {
        history.push(`/decks/${newDeck.id}`);
      }
    };

    makeDeck();
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
          <h5>Create Deck</h5>
        </nav>
        <div className="row justify-content-center mt-3">
          <h2>
            <strong>Create Deck</strong>
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
              <label htmlFor="deckName">Name</label>
            </th>
            <th className="col">
              <input
                required
                value={formInput.name}
                type="text"
                id="deckName"
                name="deckName"
                onChange={enterText}
              />
            </th>
          </tr>
          <tr>
            <th className="col">
              <label htmlFor="deckDescription">Description</label>
            </th>
            <th className="col">
              <textarea
                required
                className="form-control"
                value={formInput.description}
                id="deckDescription"
                name="deckDescription"
                onChange={enterText}
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
              style={{ height: 81 }}
            >
              Submit
            </button>
          </div>
          <div className="row" onClick={() => history.push("/")}>
            <button className="btn btn-secondary col" style={{ height: 81 }}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateDeck;
