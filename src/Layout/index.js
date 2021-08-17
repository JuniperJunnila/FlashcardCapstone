import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import DeckView from "./Components/DeckView";
import CreateDeck from "./Components/CreateDeck";
import Study from "./Components/Study"
import EditCard from "./Components/EditCard";
import EditDeck from "./Components/EditDeck";
import CreateCard from "./Components/CreateCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/decks/new'>
            <CreateDeck />
          </Route>
          <Route exact path='/decks/:deckId'>
            <DeckView />
          </Route>
          <Route path='/decks/:deckId/study'>
            <Study />
          </Route>
          <Route path='/decks/:deckId/edit'>
            <EditDeck />
          </Route>
          <Route path='/decks/:deckId/cards/new'>
            <CreateCard />
          </Route>
          <Route path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
