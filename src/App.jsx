import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import IMAGES from "./images.json";

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const SHUFFLE_CARDS = () => {
    // Duplicate the cards and sort them with a random number
    // If the number is <0 the order stays the same
    // If the number is >0 the order of those two items that it's comparing is mixed up
    const SHUFFLED_CARDS = [...IMAGES, ...IMAGES]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() })); // Map them into a new Array

    setCards(SHUFFLED_CARDS);
    setTurns(0);

    let cardGrid = document.getElementById("cardGrid");

    cardGrid.style.removeProperty("display");
  };

  const handleChoice = (card) => {
    console.info(card);
    // if choiceOne isn't null then setChoiceTwo else setChoiceOne
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            // Set matched cards to true
            if (card.src === choiceOne.src) {
              return {
                ...card,
                matched: true,
              };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        // Wait 500ms before flip the cards back again
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Log all cards for debugging
  console.log(cards);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns++);
  };

  return (
    <div className="App">
      <header>
        <div className="inline">
          <h1>Memory</h1>
          <var>Turns: {turns}</var>
        </div>
        <button onClick={SHUFFLE_CARDS}>New Game</button>
      </header>
      <div className="info">
        {cards.length > 0 ? (
          <span style={{ display: "none" }}></span>
        ) : (
          <span className="danger">You need to start a new game!</span>
        )}
      </div>

      <div className="grid" id="cardGrid" style={{ display: "none" }}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            // Flip the card on screen if card is choiceOne/Two or already matched
            // choiceOne/Two = onClick!
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;