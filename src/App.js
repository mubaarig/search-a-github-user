import React, {useState} from "react";
import Form from "./components/Form";
import CardList from "./components/CardList";

function App() {
    const [cards, setCards] = useState([]);

    const addNewCard = (card) => {
        setCards( [...cards, card]);
    }

    return (
        <div className="container mx-auto justify-center items-center h-screen">
            <h1 className='pt-10 text-center mt-6 text-3xl leading-9 font-extrabold text-gray-900'>
                Search a GitHub User
            </h1>
            <Form onSubmit={addNewCard} />
            <CardList cards={cards} />
        </div>
    )


}

export default App;
