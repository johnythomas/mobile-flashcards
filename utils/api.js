import { AsyncStorage } from "react-native"
import { FLASHCARDS_STORAGE_KEY } from "./_flashcards"

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

export const getDecks = () =>
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(
    results => (results ? JSON.parse(results) : dummyData)
  )
