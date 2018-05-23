import React from "react"
import PropTypes from "prop-types"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { primary, white, black } from "../utils/colors"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary
  },
  deckDetails: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  deckName: {
    fontSize: 50,
    color: white
  },
  deckCards: {
    color: black
  },
  deckActions: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30
  },
  button: {
    borderRadius: 5,
    borderWidth: 2,
    paddingTop: 20,
    borderColor: black,
    paddingBottom: 20,
    paddingRight: 70,
    paddingLeft: 70
  },
  startBtn: {
    backgroundColor: black,
    marginTop: 20
  }
})

const Deck = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.deckDetails}>
      <Text style={styles.deckName}>{navigation.state.params.deckName}</Text>
      <Text style={styles.deckCards}>{`10 Cards`}</Text>
    </View>
    <View style={styles.deckActions}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NewCard")}
      >
        <Text>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.startBtn]}
        onPress={() => navigation.navigate("Quiz")}
      >
        <Text style={{ color: white }}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  </View>
)

Deck.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        deckName: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    navigate: PropTypes.func.isRequired
  }).isRequired
}

export default Deck
