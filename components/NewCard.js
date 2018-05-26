import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ToastAndroid
} from "react-native"
import { primary, white, darkText, lightText, black } from "../utils/colors"
import { addCardToDeck } from "../utils/api"
import { saveCardToDeck } from "../actions"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary
  },
  questionContainer: {
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

class NewCard extends Component {
  state = {
    question: "",
    answer: ""
  }

  toggleFlip = () => {
    this.setState(currentState => ({
      flipped: !currentState.flipped
    }))
  }

  handleSubmit = () => {
    const { question, answer } = this.state
    const card = {
      question,
      answer
    }
    addCardToDeck(this.props.title, card)
    this.props.saveCard(this.props.title, card)

    this.props.navigation.pop()
    ToastAndroid.show("New Card Added", ToastAndroid.SHORT)
  }

  render() {
    const { title } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.heading}>{title}</Text>

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Question"
            placeholderTextColor={lightText}
            onChangeText={question => this.setState(() => ({ question }))}
          />

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Answer"
            placeholderTextColor={lightText}
            onChangeText={answer => this.setState(() => ({ answer }))}
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

NewCard.propTypes = {
  title: PropTypes.string.isRequired,
  saveCard: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    pop: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = (decks, { navigation }) => ({
  title: navigation.state.params.title
})

export default connect(mapStateToProps, { saveCard: saveCardToDeck })(NewCard)
