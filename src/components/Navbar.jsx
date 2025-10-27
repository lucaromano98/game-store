import {
  ShoppingCart,
  User,
  Search,
  Monitor,
  Gamepad2,
  Joystick,
  X,
} from "lucide-react";

export default function Navbar({
  cartCount = 0,
  isCompact = false,

  // stato ricerca
  isSearchOpen = false,
  searchValue = "",
  onSearchChange = () => {},
  onSearchOpen = () => {},
  onSearchClose = () => {},

  // piattaforme
  platforms = [],
  activePlatform = "all",
  onPlatformChange = () => {},

  // azioni
  onCartClick = () => {},
}) {
  //
  // Iconcine piattaforma
  //
  function renderPlatformIcon(name) {
    if (name === "all") {
      return (
        <span
          className="block w-2 h-2 rounded-full bg-[var(--accent-soft)] shadow-[0_0_8px_rgba(192,132,252,0.8)]"
          aria-hidden="true"
        />
      );
    }
    if (name === "PC") {
      return (
        <Monitor className="w-4 h-4 text-[var(--text-primary)] opacity-80" />
      );
    }
    if (name === "PS5") {
      return (
        <Gamepad2 className="w-4 h-4 text-[var(--text-primary)] opacity-80" />
      );
    }
    if (name === "Xbox") {
      return <Gamepad2 className="w-4 h-4 text-green-400/80" />;
    }
    if (name === "Switch") {
      return <Joystick className="w-4 h-4 text-red-400/80" />;
    }
    return (
      <Gamepad2 className="w-4 h-4 text-[var(--text-primary)] opacity-80" />
    );
  }

  //
  // 1. BOTTONE LENTE (nuovo stile "cool")
  //
  function SearchButton() {
    return (
      <button
        onClick={onSearchOpen}
        className={`
          relative
          flex items-center justify-center
          w-9 h-9 rounded-full
          bg-[rgba(20,12,35,0.6)]
          border border-[rgba(168,85,247,0.45)]
          shadow-[0_0_12px_rgba(168,85,247,0.5),0_0_40px_rgba(0,0,0,0.8)]
          hover:shadow-[0_0_16px_rgba(168,85,247,0.8),0_0_60px_rgba(0,0,0,0.8)]
          transition-all duration-200
          text-[color:var(--accent)]
        `}
        aria-label="Cerca"
      >
        <Search className="w-[18px] h-[18px]" />
      </button>
    );
  }

  //
  // 2. OVERLAY DI RICERCA (input + lente + X)
  //    - appare centrato con fade + scale
  //    - lente un filo più grossa (matcha il bottone)
  //
  function SearchOverlay({ positionClass = "" }) {
    return (
      <div
        className={`
          ${positionClass}
          origin-center
          flex items-center gap-2
          rounded-md
          bg-[rgba(15,10,25,0.7)]
          backdrop-blur
          border border-[rgba(168,85,247,0.5)]
          shadow-[0_0_20px_rgba(168,85,247,0.4)]
          px-2 h-9
          w-[220px] sm:w-[280px]
          text-[0.8rem] font-medium leading-none text-slate-100
          transition-all duration-300
          ${isSearchOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        <Search className="w-[18px] h-[18px] text-[color:var(--accent)] flex-shrink-0" />

        <input
          className="
            flex-1 bg-transparent outline-none
            placeholder:text-slate-400 text-slate-100
            text-[0.8rem]
          "
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cerca gioco..."
          autoFocus={isSearchOpen}
        />

        <button
          onClick={onSearchClose}
          className="text-slate-400 hover:text-slate-200 transition-colors flex-shrink-0"
          title="Chiudi ricerca"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  //
  // 3. BLOCCO "FILTRI + CERCA"
  //    - wrapper relativo che contiene:
  //      a) righe filtri + bottone lente (fade out)
  //      b) overlay di ricerca centrato sopra (fade+scale in)
  //
  function FiltersWithSearch() {
    return (
      <div
        className={`
          relative
          flex items-center justify-center flex-wrap gap-2
          min-h-[2.25rem]
        `}
      >
        {/* FILTRI + BOTTONE LENTE (si nascondono se la ricerca è aperta) */}
        <div
          className={`
            flex flex-wrap items-center gap-2 justify-center
            transition-opacity duration-200
            ${isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
        >
          {platforms.map((p) => {
            const active = p === activePlatform;
            return (
              <button
                key={p}
                onClick={() => onPlatformChange(p)}
                className={`platform-chip ${
                  active ? "platform-chip-active" : ""
                }`}
              >
                <span className="flex items-center gap-2">
                  {renderPlatformIcon(p)}
                  <span>{p === "all" ? "Tutte" : p}</span>
                </span>
              </button>
            );
          })}

          <SearchButton />
        </div>

        {/* OVERLAY DI RICERCA - assoluto sopra */}
        <SearchOverlay
          positionClass="
            absolute left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
          "
        />
      </div>
    );
  }

  //
  // 4. CENTRO NAVBAR - STATO TOP (non compatto)
  //    i link tipo "In tendenza / Preordini / ..."
  //
  const FullLinksCenter = (
    <nav
      className={`
        absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        flex flex-wrap items-center gap-4
        text-[0.8rem] font-medium text-slate-100
        whitespace-nowrap
        transition-opacity duration-300
        ${isCompact ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      <span className="nav-link">In tendenza</span>
      <span className="nav-link">Preordini</span>
      <span className="nav-link">Prossime uscite</span>
      <span className="nav-link">News</span>
      <span className="nav-link text-[color:var(--accent)]">
        Assistenza 24/7
      </span>
    </nav>
  );

  //
  // 5. CENTRO NAVBAR - STATO COMPATTO
  //    al centro mettiamo <FiltersWithSearch />
  //
  const CompactCenter = (
    <div
      className={`
        absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        transition-opacity duration-300
        ${isCompact ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <FiltersWithSearch />
    </div>
  );

  //
  // 6. PILLOLA SOTTO NAVBAR (stato TOP)
  //    la barra blur viola grossa
  //    dentro di nuovo <FiltersWithSearch />, così UX è identica
  //
  const FloatingPlatformBar = (
    <div
      className={`
        flex justify-center
        overflow-hidden
        transition-all duration-300
        ${
          isCompact
            ? "opacity-0 -translate-y-3 max-h-0 py-0 pointer-events-none"
            : "opacity-100 translate-y-0 max-h-[200px] py-3"
        }
      `}
    >
      <div
        className={`
          platform-bar max-w-full
          relative flex flex-wrap items-center justify-center gap-2
          min-h-[2.25rem]
        `}
      >
        <FiltersWithSearch />
      </div>
    </div>
  );

  //
  // 7. Azioni destra (carrello + profilo)
  //
  const ActionsRight = (
    <div className="flex items-center gap-3 flex-shrink-0">
      <button onClick={onCartClick} className="nav-action-pill">
        <ShoppingCart className="w-4 h-4 text-[color:var(--accent)] leading-none" />
        <span className="leading-none">{cartCount}</span>
      </button>

      <button className="nav-action-pill" title="Profilo">
        <User className="w-4 h-4 text-[color:var(--accent)] leading-none" />
      </button>
    </div>
  );

  //
  // 8. Layout finale navbar
  //
  return (
    <header className="sticky top-0 z-50 text-slate-100">
      {/* Riga principale sticky */}
      <div
        className="
          bg-black/60
          backdrop-blur
          border-b border-[rgba(168,85,247,0.22)]
          transition-[background-color,height,padding]
          duration-300
        "
      >
        <div
          className="
            max-w-[1280px] w-full mx-auto
            px-4 py-3
            flex flex-wrap items-center gap-4
            justify-between
          "
        >
          {/* LOGO SINISTRA */}
          <div className="flex items-baseline gap-2 select-none">
            <span className="text-lg font-semibold tracking-tight text-slate-100">
              GameForge
            </span>
            <span className="text-[0.7rem] font-medium uppercase tracking-wide text-[color:var(--accent)]">
              Store
            </span>
          </div>

          {/* CENTRO NAVBAR */}
          <div className="flex-1 relative flex justify-center min-h-[2.25rem]">
            {FullLinksCenter}
            {CompactCenter}
          </div>

          {/* DESTRA */}
          {ActionsRight}
        </div>
      </div>

      {/* PILLOLA sotto navbar (solo quando non compatta) */}
      <div className="bg-transparent transition-all duration-300">
        <div className="max-w-[1280px] w-full mx-auto px-4">
          {FloatingPlatformBar}
        </div>
      </div>
    </header>
  );
}
