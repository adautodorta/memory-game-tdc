export const ITEMS = [
  '/images/1.png',
  '/images/2.png',
  '/images/3.png',
  '/images/4.png',
  '/images/5.png',
];

export const CARDS = [...ITEMS, ...ITEMS];

export const WAIT_TIMEOUT = 500;

export const MATCHING_CARDS = 2;

export const GAME_TIME = 60;

export const GAME_ACTIONS = {
  START: 'START',
  TICK: 'TICK',
  WIN: 'WIN',
  LOSE: 'LOSE',
  REVEAL: 'REVEAL',
  HIDE_REVEALED: 'HIDE_REVEALED',
  FIND: 'FIND',
  RESET: 'RESET',
  GO_TO_INITIAL: 'GO_TO_INITIAL',
} as const;
