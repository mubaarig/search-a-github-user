import React, { useState, useCallback } from "react";
import Form from "./components/Form";
import CardList from "./components/CardList";

export default function App() {
  const [cards, setCards] = useState([]);

  const addOrUpdateCard = useCallback((card) => {
    setCards((prev) => {
      const i = prev.findIndex((c) => c.id === card.id);
      if (i !== -1) {
        const next = [...prev];
        next[i] = card;
        return next;
      }
      // new cards at the top
      return [card, ...prev];
    });
  }, []);

  return (
    <div className="container mx-auto px-4 pb-16">
      <header className="pt-10 text-center">
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
          Search a GitHub User
        </h1>
        <p className="mt-2 text-gray-600">Type a username and hit search.</p>
      </header>

      <Form onSubmit={addOrUpdateCard} />

      <CardList cards={cards} />
    </div>
  );
}
