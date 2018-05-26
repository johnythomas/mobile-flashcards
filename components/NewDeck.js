import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ToastAndroid
} from "react-native"
import { primary, white, darkText, lightText, black } from "../utils/colors"
import { addDeck } from "../actions"
import { saveDeckTitle } from "../utils/api"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary
  },
  deckContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 10
  },
  heading: {
    fontSize: 35,
    color: white,
    textAlign: "center"
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30
  },
  button: {
    backgroundColor: black,
    borderRadius: 5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 70,
    paddingLeft: 70
  },
  input: {
    margin: 25,
    height: 50,
    backgroundColor: white,
    borderRadius: 3,
    color: darkText,
    paddingHorizontal: 15
  }
})

class NewDeck extends Component {
  state = {
    deckName: ""
  }

  toggleFlip = () => {
    this.setState(currentState => ({
      flipped: !currentState.flipped
    }))
  }

  handleSubmit = () => {
    const { storeDeck, navigation } = this.props
    const deck = {
      title: this.state.deckName,
      questions: []
    }
    storeDeck(deck)
    saveDeckTitle(deck)
    this.setState(() => ({
      deckName: ""
    }))
    navigation.navigate("Decks")
    ToastAndroid.show("Deck Added", ToastAndroid.SHORT)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.deckContainer}>
          <Text style={styles.heading}>
            What is the title of your new deck?
          </Text>

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Deck Title"
            placeholderTextColor={lightText}
            value={this.state.deckName}
            onChangeText={deckName => this.setState(() => ({ deckName }))}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={{ color: white }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

NewDeck.propTypes = {
  storeDeck: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

export default connect(null, { storeDeck: addDeck })(NewDeck)
