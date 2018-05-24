import { AsyncStorage } from "react-native"
import { FLASHCARDS_STORAGE_KEY } from "./_flashcards"

export const getDecks = () => AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
