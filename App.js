import React from "react"
import PropTypes from "prop-types"
import { View, StatusBar } from "react-native"
import { Constants } from "expo"
import { createMaterialTopTabNavigator } from "react-navigation"
import { Ionicons } from "@expo/vector-icons"
import Decks from "./components/Decks"
import { primary, black, white, lightText } from "./utils/colors"
import Deck from "./components/Deck"
import Quiz from "./components/Quiz"
import NewDeck from "./components/NewDeck"
import NewCard from "./components/NewCard"

const AppStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

AppStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired
}

const Navigation = createMaterialTopTabNavigator(
  {
    Decks: {
      screen: Decks
    },
    AddDeck: {
      screen: NewDeck,
      navigationOptions: {
        title: "Add Deck"
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: white,
      inactiveTintColor: lightText,
      indicatorStyle: {
        backgroundColor: white
      },
      style: {
        backgroundColor: black,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    },
    animationEnabled: true,
    swipeEnabled: true
  }
)

const App = () => (
  <View style={{ flex: 1 }}>
    <AppStatusBar backgroundColor={black} barStyle="light-content" />
    <Navigation />
  </View>
)

export default App
