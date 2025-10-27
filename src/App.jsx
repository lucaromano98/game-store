import { useState, useMemo, useEffect, useRef } from "react";

import Navbar from "./components/Navbar.jsx";
import HeroBanner from "./components/HeroBanner.jsx";
import GameList from "./components/GameList.jsx";
import Cart from "./components/Cart.jsx";
import GameModal from "./components/GameModal.jsx";

import { games } from "./data/games.js";

// immagine hero da God of War Ragnarök (fan kit)
import heroImg from "./assets/hero-gowr.jpg";

export default function App() {
  // ----- RICERCA -----
  const [searchText, setSearchText] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function handleSearchOpen() {
    setIsSearchOpen(true);
  }

  function handleSearchClose() {
    setIsSearchOpen(false);
    // se vuoi svuotare la ricerca quando chiudi:
    // setSearchText("");
  }

  function handleSearchChange(val) {
    setSearchText(val);
  }

  // ----- FILTRO PIATTAFORMA -----
  const [platformFilter, setPlatformFilter] = useState("all"); // "all", "PC", "PS5", "Xbox", "Switch"

  // ----- CARRELLO -----
  // struttura [{ id, qty }]
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function handleOpenCart() {
    setIsCartOpen(true);
  }

  function handleCloseCart() {
    setIsCartOpen(false);
  }

  function handleAddToCart(gameId) {
    setCart((prev) => {
      const found = prev.find((item) => item.id === gameId);
      if (found) {
        return prev.map((item) =>
          item.id === gameId ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { id: gameId, qty: 1 }];
      }
    });
  }

  function handleIncrement(gameId) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === gameId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }

  function handleDecrement(gameId) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === gameId ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  // ----- MODALE GIOCO -----
  const [selectedGame, setSelectedGame] = useState(null);

  function handlePreviewGame(gameObj) {
    setSelectedGame(gameObj);
  }

  function handleCloseGameModal() {
    setSelectedGame(null);
  }

  // ----- NAVBAR COMPATTA / FULL -----
  const [isCompactHeader, setIsCompactHeader] = useState(false);

  // ref per lo stato attuale (per evitare problemi di closure nello scroll)
  const compactRef = useRef(isCompactHeader);
  useEffect(() => {
    compactRef.current = isCompactHeader;
  }, [isCompactHeader]);

  // ref per il timeout quando torni su in cima
  const pendingExpandTimeoutRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    let lock = false;
    let lockTimeoutId;

    function clearExpandCheck() {
      if (pendingExpandTimeoutRef.current) {
        clearTimeout(pendingExpandTimeoutRef.current);
        pendingExpandTimeoutRef.current = null;
      }
    }

    function scheduleExpandCheck() {
      if (pendingExpandTimeoutRef.current) return;
      pendingExpandTimeoutRef.current = setTimeout(() => {
        // se sei in cima e sei ancora compatto -> torna full
        if (!lock && window.scrollY === 0 && compactRef.current) {
          setCompactSafely(false);
        }
        pendingExpandTimeoutRef.current = null;
      }, 200);
    }

    function setCompactSafely(nextValue) {
      if (compactRef.current === nextValue) return;

      compactRef.current = nextValue;
      setIsCompactHeader(nextValue);

      // locka per ~400ms per evitare ping-pong mentre la navbar cambia altezza
      lock = true;
      clearTimeout(lockTimeoutId);
      lockTimeoutId = setTimeout(() => {
        lock = false;
      }, 400);
    }

    function handleScroll() {
      if (lock) return;

      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          const y = window.scrollY;

          // Appena scendi un minimo -> compatta
          if (!compactRef.current && y > 10) {
            clearExpandCheck();
            setCompactSafely(true);
          }
          // Se sei compatto e risali proprio a 0 -> prepara ritorno full
          else if (compactRef.current) {
            if (y === 0) {
              scheduleExpandCheck();
            } else {
              clearExpandCheck();
            }
          }

          ticking = false;
        });
      }
    }

    // inizializza lo stato corretto appena montiamo
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearExpandCheck();
      clearTimeout(lockTimeoutId);
    };
  }, []);

  // ----- HERO FEATURED GAME -----
  // Questo è il gioco che mettiamo nell'header hero diagonale
  // Usa l'immagine che hai scaricato dal fan kit ufficiale
  const featuredGame = {
    id: "god-of-war-ragnarok", // IMPORTANT: se vuoi che "Acquista ora" aggiunga questo al carrello
    title: "God of War Ragnarök",
    price: 59.99,
    discount: 35, // sconto tipo Instant Gaming style
    isPreorder: false,
    releaseDateText: "Disponibile ora",
    heroImage: heroImg,
  };

  // ----- DERIVATI -----
  // totale pezzi nel carrello (badge navbar)
  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.qty, 0);
  }, [cart]);

  // filtriamo i giochi in base a testo e piattaforma
  const filteredGames = useMemo(() => {
    return games.filter((g) => {
      const matchesText = g.title
        .toLowerCase()
        .includes(searchText.toLowerCase().trim());

      const matchesPlatform =
        platformFilter === "all" ? true : g.platform === platformFilter;

      return matchesText && matchesPlatform;
    });
  }, [searchText, platformFilter]);

  // ----- RENDER PRINCIPALE -----
  return (
    <div className="min-h-screen text-slate-100 relative">
      {/* NAVBAR sticky con stati top/compatto, filtri dinamici e ricerca animata */}
      <Navbar
        cartCount={cartCount}
        isCompact={isCompactHeader}
        // ricerca
        isSearchOpen={isSearchOpen}
        searchValue={searchText}
        onSearchChange={handleSearchChange}
        onSearchOpen={handleSearchOpen}
        onSearchClose={handleSearchClose}
        // piattaforme
        platforms={["all", "PC", "PS5", "Xbox", "Switch"]}
        activePlatform={platformFilter}
        onPlatformChange={setPlatformFilter}
        // carrello
        onCartClick={handleOpenCart}
      />

      {/* HERO stile Instant Gaming con clip diagonale e CTA "Acquista ora" */}
      <HeroBanner
        game={featuredGame}
        onBuy={(gameId) => {
          handleAddToCart(gameId);
          // se vuoi anche aprire direttamente il carrello quando clicchi:
          // handleOpenCart();
        }}
      />

      {/* CONTENUTO PRINCIPALE */}
      <main className="max-w-[1280px] w-full mx-auto px-4 py-10 space-y-8">
        {/* INTRO */}
        <section className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight flex flex-wrap items-start gap-3 text-slate-100">
            <span>Benvenuto nello store</span>
            <span className="text-[color:var(--accent)] text-4xl sm:text-5xl">
              👾
            </span>
          </h1>

          <p className="text-dim text-sm sm:text-base max-w-2xl">
            Scegli la piattaforma dalla barra in alto, clicca un gioco per
            vedere i dettagli, aggiungilo al carrello e apri il carrello
            quando vuoi.
          </p>
        </section>

        {/* LISTA GIOCHI */}
        <section>
          <GameList
            games={filteredGames}
            onAdd={handleAddToCart}
            onPreview={handlePreviewGame}
          />
        </section>
      </main>

      {/* DRAWER CARRELLO (slide da destra) */}
      <div
        className={`
          fixed inset-0 z-[100] flex justify-end
          ${isCartOpen ? "pointer-events-auto" : "pointer-events-none"}
        `}
      >
        {/* overlay scuro cliccabile dietro il carrello */}
        <div
          onClick={handleCloseCart}
          className={`
            absolute inset-0 backdrop-blur-sm bg-black/60
            transition-opacity duration-200
            ${isCartOpen ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* pannello carrello */}
        <div
          className={`
            relative z-[101]
            w-[360px] max-w-[80%] h-full p-4 flex flex-col
            bg-transparent
            transform transition-transform duration-200 ease-out
            ${isCartOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <button
            onClick={handleCloseCart}
            className="
              self-end mb-2
              text-[0.7rem] font-medium leading-none
              text-[color:var(--accent)]
              bg-[rgba(15,10,25,0.55)]
              border border-[rgba(168,85,247,0.28)]
              rounded-md
              px-2 py-1
              hover:border-[rgba(168,85,247,0.45)]
              transition-colors
            "
          >
            Chiudi ✕
          </button>

          <div className="overflow-y-auto max-h-[calc(100vh-3rem)]">
            <Cart
              cart={cart}
              games={games}
              onInc={handleIncrement}
              onDec={handleDecrement}
            />
          </div>
        </div>
      </div>

      {/* MODALE DETTAGLIO GIOCO */}
      {selectedGame && (
        <GameModal
          game={selectedGame}
          onAdd={handleAddToCart}
          onClose={handleCloseGameModal}
        />
      )}
    </div>
  );
}
