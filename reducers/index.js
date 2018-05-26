import { RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from "../actions"

const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.decks
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck
      }
    case ADD_CARD_TO_DECK:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: state[action.title].questions.concat([action.card])
        }
      }
    default:
      return state
  }
}

export default decks
