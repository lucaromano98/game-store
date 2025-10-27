import { useMemo } from "react";

// Icona carrello piccola nel CTA
import { ShoppingCart } from "lucide-react";

/**
 * Props:
 * - game: {
 *     id,
 *     title,
 *     price,            // numero o string tipo "44.99"
 *     discount,         // numero intero tipo 35 (percentuale)
 *     releaseDateText,  // string tipo "27 febbraio 2026"
 *     isPreorder,       // true/false
 *     heroImage,        // url immagine header larga
 *   }
 * - onBuy(gameId): funzione da chiamare quando clicchi "Acquista ora"
 */
export default function HeroBanner({ game, onBuy }) {
  // prezzo formattato tipo "44.99 €"
  const priceLabel = useMemo(() => {
    if (!game?.price && game?.price !== 0) return "";
    return `${Number(game.price).toFixed(2)} €`;
  }, [game]);

  if (!game) return null;

  return (
    <section
      className={`
        relative w-full text-white overflow-hidden
        h-[260px] sm:h-[320px] lg:h-[360px]
        [clip-path:polygon(0_0,100%_0,100%_80%,0_100%)]
      `}
      style={{
        backgroundImage: `url(${game.heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* overlay scuro sopra l'immagine per leggibilità */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r from-black/80 via-black/40 to-black/0
        "
      />

      {/* contenuto testo */}
      <div
        className="
          relative h-full
          max-w-[1280px] w-full mx-auto
          px-4 py-6 sm:py-8 flex flex-col justify-end
          text-left
        "
      >
        {/* row badge preorder / data */}
        <div className="flex flex-wrap gap-2 mb-4 text-[0.7rem] font-medium">
          {game.isPreorder && (
            <span
              className="
                inline-block
                bg-[rgba(0,0,0,0.6)]
                border border-white/20
                rounded-[4px]
                px-3 py-[4px]
                leading-none
                text-white
                uppercase tracking-wide
              "
            >
              Preordine
            </span>
          )}

          {game.releaseDateText && (
            <span
              className="
                inline-block
                bg-[rgba(0,0,0,0.6)]
                border border-white/20
                rounded-[4px]
                px-3 py-[4px]
                leading-none
                text-white
                tracking-wide
              "
            >
              {game.releaseDateText}
            </span>
          )}
        </div>

        {/* titolo gioco */}
        <h2
          className="
            text-2xl sm:text-[1.9rem] lg:text-[2.1rem]
            font-semibold leading-tight text-white
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]
            mb-4
          "
        >
          {game.title}
        </h2>

        {/* prezzo+cta */}
        <div className="flex flex-wrap items-end gap-4 sm:gap-6">
          {/* blocco sconto + prezzo */}
          <div className="flex items-center gap-4">
            {game.discount != null && (
              <span
                className="
                  inline-block
                  bg-orange-600
                  text-black font-bold
                  text-[0.8rem] leading-none
                  px-2 py-[6px] rounded-[4px]
                  shadow-[0_4px_12px_rgba(0,0,0,0.6)]
                "
              >
                -{game.discount}%
              </span>
            )}

            <span
              className="
                text-white font-semibold
                text-2xl sm:text-[1.8rem] leading-none
                drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]
              "
            >
              {priceLabel}
            </span>
          </div>

          {/* CTA acquista */}
          <button
            onClick={() => onBuy(game.id)}
            className={`
              flex items-center gap-2
              bg-[rgba(15,10,25,0.6)]
              border border-[rgba(168,85,247,0.5)]
              text-[color:var(--accent)]
              text-sm font-medium leading-none
              rounded-md
              px-3 py-2
              shadow-[0_0_12px_rgba(168,85,247,0.5)]
              hover:shadow-[0_0_16px_rgba(168,85,247,0.8)]
              transition-all duration-200
            `}
          >
            <ShoppingCart className="w-4 h-4 text-[color:var(--accent)]" />
            <span>Acquista ora</span>
          </button>
        </div>
      </div>
    </section>
  );
}
