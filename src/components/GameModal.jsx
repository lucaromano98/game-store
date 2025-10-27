export default function GameModal({ game, onAdd, onClose }) {
  if (!game) return null;

  return (
    <div
      className="
        fixed inset-0 z-[200] flex items-center justify-center
        pointer-events-auto
      "
    >
      {/* sfondo scuro dietro la modale */}
      <div
        className="
          absolute inset-0 bg-black/70 backdrop-blur-sm
        "
        onClick={onClose}
      />

      {/* box modale */}
      <div
        className="
          relative z-[201]
          panel
          w-full max-w-[500px]
          max-h-[90vh]
          flex flex-col
          overflow-hidden
        "
      >
        {/* header con bottone chiudi */}
        <div className="flex items-start justify-between p-4 border-b border-[rgba(168,85,247,0.22)]">
          <div className="flex flex-col">
            <h2 className="text-slate-100 text-lg font-semibold leading-tight">
              {game.title}
            </h2>
            <span className="pill mt-2 w-fit text-[0.6rem] px-1.5 py-0.5 leading-none">
              {game.platform}
            </span>
          </div>

          <button
            className="
              text-[0.7rem] font-medium leading-none
              text-[color:var(--accent)]
              bg-[rgba(15,10,25,0.55)]
              border border-[rgba(168,85,247,0.28)]
              rounded-md
              px-2 py-1
              hover:border-[rgba(168,85,247,0.45)]
              transition-colors
            "
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* contenuto scrollabile */}
        <div className="overflow-y-auto p-4 flex flex-col gap-4">
          {/* cover */}
          <div className="bg-slate-800/40 rounded-lg overflow-hidden">
            <img
              src={game.cover}
              alt={game.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* descrizione */}
          <p className="text-sm text-dim leading-relaxed">
            {game.description}
          </p>

          {/* prezzo */}
          <div className="text-slate-100 text-base font-semibold">
            € {game.price.toFixed(2)}
          </div>

          {/* CTA */}
          <button
            className="btn-accent"
            onClick={() => {
              onAdd(game.id);
              onClose();
            }}
          >
            Aggiungi al carrello
          </button>
        </div>
      </div>
    </div>
  );
}
