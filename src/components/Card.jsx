import "../Card.css";
export default function Card({ card, handleChoice }) {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className="card">
      <div>
        <img
          className={card.css}
          src={card.src}
          alt="card front"
          aria-label="card front"
        />
        <img
          onClick={handleClick}
          className="back serv"
          src="/img/card-random.svg"
          alt="card back"
          aria-label="card back"
        />
      </div>
    </div>
  );
}
