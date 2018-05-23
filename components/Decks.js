import React from "react"
import PropTypes from "prop-types"
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native"
import { primary, white, darkText, lightText } from "../utils/colors"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: primary
  },
  deck: {
    paddingTop: 25,
    paddingBottom: 25,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 3,
    alignItems: "center",
    backgroundColor: white
  },
  deckName: {
    fontSize: 30,
    color: darkText
  },
  deckCards: {
    color: lightText
  }
})

const decks = [
  {
    deckName: "UdaciDeck",
    cards: 2
  },
  {
    deckName: "Chemistry",
    cards: 1
  },
  {
    deckName: "Maths",
    cards: 5
  },
  {
    deckName: "Computer Science",
    cards: 12
  },
  {
    deckName: "Physics",
    cards: 10
  }
]

const Decks = ({ navigation }) => (
  <View style={styles.container}>
    <FlatList
      data={decks}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Deck", {
              deckName: item.deckName
            })
          }
        >
          <View style={styles.deck}>
            <Text style={styles.deckName}>{item.deckName}</Text>
            <Text style={styles.deckCards}>{`${item.cards} Cards`}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.deckName}
    />
  </View>
)

Decks.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

export default Decks
