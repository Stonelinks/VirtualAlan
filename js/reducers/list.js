
import type { Action } from '../actions/types';
import { SET_INDEX } from '../actions/list';

export type State = {
    list: string
}

const initialState = {
  list: [
    'Sure why not',
    'Be there in 18 minutes',
    'Coffee?',
    'Blue bottle?',
    'I want tacko',
    'I want swensens',
    'Hilarious',
    'We\'re not solving for that',
    'k great',
    'ya\'ll coming over?',
    'Does brian have pants on?',
    'What is Brian drinking?',
    'You\'re not answering the question',
    'Love it',
    'affagados?',
    'When I go to the bank, I only get $100 in quarters',
  ],
  selectedIndex: undefined,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_INDEX) {
    return {
      ...state,
      selectedIndex: action.payload,
    };
  }
  return state;
}
