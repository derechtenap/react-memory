import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import IMAGES from "./images.json";

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleStartNewGame = () => {
    // Duplicate the cards and shuffle them randomly
    const SHUFFLED_CARDS = [...IMAGES, ...IMAGES]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: crypto.randomUUID() }));

    // Reset choices just in case one is still set
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(SHUFFLED_CARDS);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare the selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      // Disable player input
      setDisabled(true);

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
        // After 500ms flip the cards back
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    handleStartNewGame();
  }, []);

  return (
    <div className="App">
      <header>
        <div className="w-100">
          <h1>Memory</h1>
          <var>Turns: {turns}</var>
        </div>
        <button onClick={handleStartNewGame}>New Game</button>
      </header>

      <div className="grid" id="cardGrid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            // Flip card if selected or already matched
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
