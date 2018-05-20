import React, { Component } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { primary, white, darkText } from "../utils/colors"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  question: {
    fontSize: 35,
    color: white,
    textAlign: "center"
  },
  answerBtnText: {
    color: darkText,
    fontSize: 20
  },
  questionActions: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30
  },
  button: {
    borderRadius: 5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 70,
    paddingLeft: 70
  },
  incorrectBtn: {
    backgroundColor: "red",
    marginTop: 20
  },
  correctBtn: {
    backgroundColor: "green"
  }
})

class Quiz extends Component {
  state = {
    flipped: false
  }

  toggleFlip = () => {
    this.setState(currentState => ({
      flipped: !currentState.flipped
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, color: white }}>1/2</Text>

        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            {this.state.flipped
              ? "Yes"
              : "Does React Native works with Android?"}
          </Text>
          <TouchableOpacity onPress={this.toggleFlip}>
            <Text style={styles.answerBtnText}>
              {this.state.flipped ? "Question" : "Answer"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.questionActions}>
          <TouchableOpacity style={[styles.button, styles.correctBtn]}>
            <Text style={{ color: white }}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.incorrectBtn]}>
            <Text style={{ color: white }}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Quiz
