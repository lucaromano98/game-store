import GameCard from "./GameCard.jsx";

export default function GameList({ games, onAdd, onPreview }) {
  if (!games || games.length === 0) {
    return (
      <div className="text-center text-slate-400 text-sm py-16">
        Nessun gioco trovato.
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-3
        lg:grid-cols-4
        gap-6 sm:gap-8
      "
    >
      {games.map((g) => (
        <GameCard
          key={g.id}
          game={g}
          onAdd={onAdd}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
}
