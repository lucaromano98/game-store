// src/data/games.js

import gowrCover from "../assets/gowr-cover.jpg";
import re4Cover from "../assets/re4-cover.png";
import eldenCover from "../assets/eldenring-cover.jpg";
import cyberCover from "../assets/cyberpunk-cover.png";
import expeditionCover from "../assets/expedition33-cover.jpg"

export const games = [
  {
    id: "god-of-war-ragnarok",
    title: "God of War Ragnarök",
    platform: "PS5",
    price: 59.99,
    discount: 35, // percentuale sconto
    cover: gowrCover,
    shortDesc:
      "Kratos e Atreus affrontano il destino mentre gli dèi norreni si preparano al Ragnarök.",
  },
  {
    id: "resident-evil-4-remake",
    title: "Resident Evil 4 Remake",
    platform: "PC",
    price: 39.99,
    discount: 20,
    cover: re4Cover,
    shortDesc:
      "Leon S. Kennedy deve salvare la figlia del presidente in un villaggio corrotto da un’arma bio-organica.",
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    platform: "Xbox",
    price: 54.99,
    discount: 10,
    cover: eldenCover,
    shortDesc:
      "Open world dark fantasy gigantesco e brutale firmato FromSoftware.",
  },
  {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    platform: "PC",
    price: 29.99,
    discount: 50,
    cover: cyberCover,
    shortDesc:
      "RPG open world futuristico nella follia neon di Night City.",
  },
  {
    id: "expedition-33",
    title: "Clair Obscure: Expedition 33",
    platform: "PC",
    price: 50,
    discount: 20,
    cover: expeditionCover,
    shortDesc:
      "Dark fantasy ispirato alla Belle Époque: ogni anno la Pittrice dipinge un numero e chi ha quell’età svanisce. Tu fai parte della Spedizione 33, l’ultima missione disperata per fermarla, tra combattimenti a turni con schivate e parate in tempo reale.",
  },
];
