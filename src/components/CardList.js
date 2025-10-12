import React from "react";
import Card from "./Card";

export default function CardList({ cards = [] }) {
  if (!cards.length) {
    return (
      <p className="mt-16 text-center text-gray-500 dark:text-gray-400">
        Search above to see GitHub profiles.
      </p>
    );
  }
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.id != null ? card.id : card.login} {...card} />
      ))}
    </div>
  );
}