import { AsyncStorage } from "react-native"
import { FLASHCARDS_STORAGE_KEY } from "./_flashcards"

const setDummyData = () => {
  const dummyData = {
    React: {
      title: "React",
      questions: [
        {
          question: "What is React?",
          answer: "A library for managing user interfaces"
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event"
        }
      ]
    },
    JavaScript: {
      title: "JavaScript",
      questions: [
        {
          question: "What is a closure?",
          answer:
            "The combination of a function and the lexical environment within which that function was declared."
        }
      ]
    }
  }

  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(dummyData))
  return dummyData
}

export const getDecks = () =>
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(
    results => (results ? JSON.parse(results) : setDummyData())
  )

export const saveDeckTitle = deck =>
  AsyncStorage.mergeItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify({
      [deck.title]: deck
    })
  )

export const addCardToDeck = (title, card) =>
  getDecks().then(decks => {
    const updatedDecks = {
      ...decks,
      [title]: {
        ...decks[title],
        questions: decks[title].questions.concat([card])
      }
    }
    return AsyncStorage.setItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify(updatedDecks)
    )
  })
