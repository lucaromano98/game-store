export default function Cart({
  cart = [],
  games = [],
  onInc = () => {},
  onDec = () => {},
}) {
  // arricchiamo il carrello con i dati dei giochi
  const cartDetails = cart.map((item) => {
    const gameData = games.find((g) => g.id === item.id);

    if (!gameData) {
      return {
        id: item.id,
        title: "Gioco sconosciuto",
        platform: "-",
        price: 0,
        qty: item.qty ?? 0,
        subtotal: 0,
      };
    }

    return {
      ...gameData,
      qty: item.qty ?? 0,
      subtotal: gameData.price * (item.qty ?? 0),
    };
  });

  const total = cartDetails.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <aside
      className="
        panel
        p-4
        text-slate-100
        md:sticky md:top-24
        h-fit
      "
    >
      {/* Header carrello */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-100 leading-tight">
            Carrello
          </h2>
          <p className="text-[0.7rem] text-dim leading-snug">
            Rivedi gli articoli e il totale
          </p>
        </div>

        <div className="text-right">
          <div className="text-[0.7rem] font-medium text-[color:var(--accent)]">
            {cartDetails.length} articoli
          </div>
        </div>
      </div>

      {/* Lista articoli */}
      {cartDetails.length === 0 ? (
        <div className="text-dim text-sm mb-6">
          Il carrello è vuoto 
        </div>
      ) : (
        <ul className="space-y-4 mb-6">
          {cartDetails.map((item) => (
            <li
              key={item.id}
              className="
                flex justify-between items-start
                bg-[rgba(10,10,20,0.4)]
                border border-[rgba(168,85,247,0.15)]
                rounded-lg
                p-3
              "
            >
              {/* info gioco */}
              <div className="text-sm flex-1 min-w-0">
                <div className="text-slate-100 font-semibold leading-tight">
                  {item.title}
                </div>

                <div className="pill mt-1 w-fit text-[0.6rem] px-1.5 py-0.5 leading-none">
                  {item.platform}
                </div>

                {/* controlli quantità */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    className="qty-btn"
                    onClick={() => onDec(item.id)}
                  >
                    −
                  </button>

                  <span className="qty-value">{item.qty}</span>

                  <button
                    className="qty-btn"
                    onClick={() => onInc(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* prezzo/subtotale */}
              <div className="text-right text-slate-100 text-sm font-medium pl-3 shrink-0">
                € {item.subtotal.toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Totale */}
      <div className="flex justify-between items-center text-slate-100 font-semibold text-base border-t border-[rgba(168,85,247,0.22)] pt-4 mb-4">
        <span>Totale</span>
        <span>€ {total.toFixed(2)}</span>
      </div>

      {/* Checkout */}
      <button
        className="btn-accent"
        disabled={cartDetails.length === 0}
        style={cartDetails.length === 0 ? { opacity: 0.4, cursor: "not-allowed" } : {}}
      >
        Checkout
      </button>
    </aside>
  );
}
