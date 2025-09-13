"use client";

import { useEffect, useReducer, Reducer } from "react";

import { CARDS, WAIT_TIMEOUT, MATCHING_CARDS, GAME_ACTIONS, GAME_TIME } from "./constants";
import { shuffle } from "./utils";

export type GameStatus = 'initial' | 'playing' | 'won' | 'lost';

interface GameState {
  cards: string[];
  found: string[];
  revealedIndexes: number[];
  moves: number;
  timeLeft: number;
  status: GameStatus;
}

interface GameAction {
  type: string;
  card?: string;
  cardIndex?: number;
  timeLeft?: number;
}

const initialGameState: GameState = {
  cards: [...CARDS],
  found: [],
  revealedIndexes: [],
  moves: 0,
  timeLeft: GAME_TIME,
  status: 'initial',
};

export function useGame() {
  const [game, dispatchGame] = useReducer(gameReducer, initialGameState);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    
    if (game.status === 'playing' && game.timeLeft > 0) {
      timer = setInterval(() => {
        dispatchGame({ type: GAME_ACTIONS.TICK });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [game.status, game.timeLeft]);

  useEffect(() => {
    if (game.status === 'playing') {
      if (game.timeLeft <= 0) {
        dispatchGame({ type: GAME_ACTIONS.LOSE });
      } else if (game.found.length === CARDS.length / 2) {
        dispatchGame({ type: GAME_ACTIONS.WIN });
      }
    }
  }, [game.timeLeft, game.found.length, game.status]);

  useEffect(() => {
    let foundTimeout: ReturnType<typeof setTimeout>,
      revealTimeout: ReturnType<typeof setTimeout>;

    if (game.revealedIndexes.length === MATCHING_CARDS) {
      const [first, second]: number[] = game.revealedIndexes;
      if (game.cards[first] === game.cards[second]) {
        foundTimeout = setTimeout(() => {
          dispatchGame({ type: GAME_ACTIONS.FIND, card: game.cards[first] });
        }, WAIT_TIMEOUT);
      }

      revealTimeout = setTimeout(() => {
        dispatchGame({ type: GAME_ACTIONS.HIDE_REVEALED });
      }, WAIT_TIMEOUT);
    }

    return () => {
      if (foundTimeout) clearTimeout(foundTimeout);
      if (revealTimeout) clearTimeout(revealTimeout);
    };
  }, [game.revealedIndexes]);

  const startGame = () => {
    dispatchGame({ type: GAME_ACTIONS.START });
  };

  const revealCard = (cardIndex: number) => {
    if (game.revealedIndexes.length < MATCHING_CARDS) {
      dispatchGame({ type: GAME_ACTIONS.REVEAL, cardIndex });
    }
  };

  const reset = () => {
    dispatchGame({ type: GAME_ACTIONS.RESET });
  };

  const goToInitial = () => {
    dispatchGame({ type: GAME_ACTIONS.GO_TO_INITIAL });
  };

  return {
    state: {
      ...game,
    },
    handler: {
      startGame,
      revealCard,
      reset,
      goToInitial,
    },
  };
}

function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === GAME_ACTIONS.START) {
    return {
      ...state,
      status: 'playing',
      timeLeft: GAME_TIME,
      cards: shuffle([...CARDS]),
      found: [],
      revealedIndexes: [],
      moves: 0,
    };
  }
  if (action.type === GAME_ACTIONS.TICK) {
    return {
      ...state,
      timeLeft: Math.max(0, state.timeLeft - 1),
    };
  }
  if (action.type === GAME_ACTIONS.WIN) {
    return {
      ...state,
      status: 'won',
    };
  }
  if (action.type === GAME_ACTIONS.LOSE) {
    return {
      ...state,
      status: 'lost',
    };
  }
  if (action.type === GAME_ACTIONS.REVEAL) {
    const cardIndex = action.cardIndex as number;
    const revealedIndexes =
      state.revealedIndexes.length > 0
        ? [...state.revealedIndexes, cardIndex]
        : [cardIndex];
    return {
      ...state,
      revealedIndexes,
      moves: state.moves + 1,
    };
  }
  if (action.type === GAME_ACTIONS.HIDE_REVEALED) {
    return {
      ...state,
      revealedIndexes: [],
    };
  }
  if (action.type === GAME_ACTIONS.FIND) {
    const card = action.card as string;
    const found = state.found.length > 0 ? [...state.found, card] : [card];

    return {
      ...state,
      found,
    };
  }
  if (action.type === GAME_ACTIONS.RESET) {
    return {
      cards: shuffle([...CARDS]),
      found: [],
      revealedIndexes: [],
      moves: 0,
      timeLeft: GAME_TIME,
      status: 'playing',
    };
  }
  if (action.type === GAME_ACTIONS.GO_TO_INITIAL) {
    return {
      ...state,
      cards: [...CARDS],
      found: [],
      revealedIndexes: [],
      moves: 0,
      timeLeft: GAME_TIME,
      status: 'initial',
    };
  }

  return state;
}
