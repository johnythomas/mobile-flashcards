import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native"
import { AppLoading } from "expo"
import { primary, white, darkText, lightText } from "../utils/colors"
import { receiveDecks } from "../actions"
import { getDecks } from "../utils/api"

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

class Decks extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    getDecks()
      .then(this.props.getDecks)
      .then(() =>
        this.setState(() => ({
          ready: true
        }))
      )
  }

  render() {
    const { navigation, decks } = this.props
    if (!this.state.ready) {
      return <AppLoading />
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Deck", {
                  deckName: item.title
                })
              }
            >
              <View style={styles.deck}>
                <Text style={styles.deckName}>{item.title}</Text>
                <Text style={styles.deckCards}>{`${
                  item.cardCount
                } Cards`}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.title}
        />
      </View>
    )
  }
}

Decks.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  getDecks: PropTypes.func.isRequired,
  decks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      cardCount: PropTypes.number.isRequired
    })
  ).isRequired
}

const mapStateToProps = decks => ({
  decks: Object.values(decks).map(deck => ({
    title: deck.title,
    cardCount: deck.questions.length
  }))
})

export default connect(mapStateToProps, { getDecks: receiveDecks })(Decks)
