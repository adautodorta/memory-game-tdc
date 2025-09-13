"use client";

import { useEffect, useReducer } from "react";

import { useGame } from "./use-game";
import { isGameOver } from "./utils";
import { CARDS, MATCHING_CARDS } from "./constants";
import Image from "next/image";
import { StartScreen } from "./start-screen";
import { GameModal } from "./game-modal";

function Card({
  item,
  onClick,
  revealed = false,
  found = false,
}: {
  item: string;
  onClick: () => void;
  revealed?: boolean;
  found?: boolean;
}) {
  const cardTransitionClasses = "transition duration-500";
  const cardContentTransitionClasses = "transition duration-300";
  const contentClasses = "bg-stone-400 w-full h-full absolute top-0 left-0 rounded";
  const flipUpClasses = "scale-x-100 opacity-100";
  const flipDownClasses = "-scale-x-100 opacity-0";

  return (
    <button
      className={`w-20 h-32 relative ${cardTransitionClasses} ${
        found ? "opacity-0" : ""
      }`}
      onClick={() => {
        if (!found && !revealed) {
          onClick();
        }
      }}
      aria-label="Memory Card"
    >
      <div
        className={`${contentClasses} ${cardTransitionClasses} ${
          revealed ? flipDownClasses : flipUpClasses
        }`}
      />

      <div
        className={`flex items-center justify-center ${contentClasses} ${cardTransitionClasses} ${
          revealed ? flipUpClasses : flipDownClasses
        }`}
      >
        <Image
          src={item}
          alt="Memory card item"
          className={`w-12 h-12 object-contain ${cardContentTransitionClasses} ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
          width={100}
          height={100}
        />
      </div>
    </button>
  );
}

export function Board() {
  const { state, handler } = useGame();

  if (state.status === 'initial') {
    return <StartScreen onStart={handler.startGame} />;
  }

  if (state.status === 'won' || state.status === 'lost') {
    return (
      <GameModal
        type={state.status}
        moves={state.moves}
        timeLeft={state.timeLeft}
        onPlayAgain={handler.reset}
        onGoHome={handler.goToInitial}
      />
    );
  }

  return (
    <div className="flex w-full items-center justify-center gap-6 flex-col text-stone-950 min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 p-4" aria-label="Memory Board">
      <div className="flex flex-col bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-stone-900">
          🧠 Jogo da Memória
        </h1>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <p className="text-sm text-stone-600">Tempo</p>
            <p className={`text-2xl font-bold ${state.timeLeft <= 10 ? 'text-red-500' : 'text-stone-900'}`}>
              {state.timeLeft}s
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-stone-600">Tentativas</p>
            <p className="text-2xl font-bold text-stone-900">{state.moves}</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-stone-600">Pares</p>
            <p className="text-2xl font-bold text-stone-900">
              {state.found.length}/{CARDS.length / 2}
            </p>
          </div>
        </div>

        <button
          className="self-center px-4 py-2 font-bold border rounded border-gray-600 text-slate-800 hover:bg-gray-100 transition-colors duration-200"
          onClick={() => handler.goToInitial()}
        >
          🏠 Voltar ao Início
        </button>
      </div>

      <div className="flex w-11/12 md:w-2/3 max-w-md items-center justify-center gap-2 flex-wrap">
        {state.cards.map((item, i) => (
          <Card
            item={item}
            key={`key-item-${item}-${i}`}
            onClick={() => handler.revealCard(i)}
            found={state.found.includes(item)}
            revealed={state.revealedIndexes.includes(i)}
          />
        ))}
      </div>
    </div>
  );
}
