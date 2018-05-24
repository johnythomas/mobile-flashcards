import { RECEIVE_DECKS, ADD_DECK } from "../actions"

const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.decks
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck
      }
    default:
      return state
  }
}

export default decks
