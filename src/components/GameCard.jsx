import { ShoppingCart } from "lucide-react";

export default function GameCard({ game, onAdd, onPreview }) {
  if (!game) return null;

  const basePrice = Number(game.price);
  const hasDiscount = game.discount && game.discount > 0;
  const finalPrice = hasDiscount
    ? basePrice * (1 - game.discount / 100)
    : basePrice;

  // badge piattaforma (PS5 blu, Xbox verde, PC grigio, Switch rosso)
  function PlatformBadge({ platform }) {
    let colorClasses =
      "bg-[rgba(168,85,247,0.15)] text-[color:var(--accent)] border border-[rgba(168,85,247,0.4)]";
    if (platform === "PS5") {
      colorClasses =
        "bg-blue-500/20 text-blue-300 border border-blue-500/40";
    } else if (platform === "Xbox") {
      colorClasses =
        "bg-green-500/20 text-green-300 border border-green-500/40";
    } else if (platform === "PC") {
      colorClasses =
        "bg-slate-500/20 text-slate-200 border border-slate-400/40";
    } else if (platform === "Switch") {
      colorClasses = "bg-red-500/20 text-red-300 border border-red-500/40";
    }

    return (
      <span
        className={`
          inline-block rounded-[4px]
          px-2 py-[4px]
          text-[0.6rem] font-semibold leading-none uppercase tracking-wide
          ${colorClasses}
        `}
      >
        {platform}
      </span>
    );
  }

  return (
    <div
      className="
        group relative flex flex-col
        bg-[rgba(15,10,25,0.6)]
        border border-[rgba(168,85,247,0.25)]
        rounded-xl overflow-hidden
        shadow-[0_0_30px_rgba(168,85,247,0.15)]
        hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]
        transition-all duration-200
        cursor-pointer
      "
      onClick={() => onPreview(game)}
    >
      {/* COVER */}
      <div className="relative w-full h-40 sm:h-48 bg-black">
        <img
          src={game.cover}
          alt={game.title}
          className="
            absolute inset-0 w-full h-full object-cover object-center
            transition-transform duration-300
            group-hover:scale-[1.03]
          "
        />

        {/* BADGE SCONTO */}
        {hasDiscount && (
          <div
            className="
              absolute top-2 left-2
              bg-orange-600
              text-black font-bold
              text-[0.75rem] leading-none
              px-2 py-[4px] rounded-[4px]
              shadow-[0_4px_12px_rgba(0,0,0,0.6)]
            "
          >
            -{game.discount}%
          </div>
        )}
      </div>

      {/* BODY */}
      <div className="flex flex-col flex-1 p-4 gap-4">
        {/* TITOLO + DESC BREVE + PIATTAFORMA */}
        <div className="flex flex-col gap-2">
          <h3 className="text-slate-100 font-semibold text-sm leading-snug">
            {game.title}
          </h3>

          <div className="flex items-center flex-wrap gap-2 text-[0.7rem] leading-snug">
            <PlatformBadge platform={game.platform} />
            <p className="text-slate-400 text-[0.7rem] leading-snug max-w-[220px]">
              {game.shortDesc}
            </p>
          </div>
        </div>

        {/* PREZZO + BOTTONE */}
        <div className="flex items-end justify-between">
          {/* PREZZO */}
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-[0.7rem] text-slate-400 line-through leading-none">
                {basePrice.toFixed(2)} €
              </span>
            )}

            <span className="text-white font-semibold text-lg leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {finalPrice.toFixed(2)} €
            </span>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // evita di aprire il preview
              onAdd(game.id);
            }}
            className={`
              flex items-center gap-2
              bg-[rgba(15,10,25,0.6)]
              border border-[rgba(168,85,247,0.5)]
              text-[color:var(--accent)]
              text-[0.7rem] font-medium leading-none
              rounded-md
              px-2 py-2
              shadow-[0_0_12px_rgba(168,85,247,0.5)]
              hover:shadow-[0_0_16px_rgba(168,85,247,0.8)]
              transition-all duration-200
            `}
          >
            <ShoppingCart className="w-4 h-4 text-[color:var(--accent)]" />
            <span>Carrello</span>
          </button>
        </div>
      </div>
    </div>
  );
}
