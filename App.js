import React from "react"
import PropTypes from "prop-types"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { View, StatusBar } from "react-native"
import { Constants } from "expo"
import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation"
import Decks from "./components/Decks"
import { black, white, lightText } from "./utils/colors"
import Deck from "./components/Deck"
import Quiz from "./components/Quiz"
import NewDeck from "./components/NewDeck"
import NewCard from "./components/NewCard"
import reducers from "./reducers"

const AppStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

AppStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired
}

const Tabs = createMaterialTopTabNavigator(
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

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    headerMode: "none",
    header: null,
    navigationOptions: {
      header: null
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: "Deck"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz"
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: "Add Card"
    }
  }
})

const store = createStore(reducers)

const App = () => (
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      <AppStatusBar backgroundColor={black} barStyle="light-content" />
      <MainNavigator />
    </View>
  </Provider>
)

export default App
