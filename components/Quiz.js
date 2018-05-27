import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { primary, white, darkText, black } from "../utils/colors"
import { clearLocalNotification, setLocalNotification } from "../utils/helpers"

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
    flipped: false,
    score: 0,
    index: 0
  }

  toggleFlip = () => {
    this.setState(currentState => ({
      flipped: !currentState.flipped
    }))
  }

  handleAnswer = isCorrect => {
    if (this.state.index === this.props.deck.questions.length - 1) {
      clearLocalNotification().then(setLocalNotification)
    }

    this.setState(currentState => {
      const score = isCorrect ? currentState.score + 1 : currentState.score
      return {
        score,
        index: currentState.index + 1,
        flipped: false
      }
    })
  }

  resetState = () => {
    this.setState(() => ({
      flipped: false,
      score: 0,
      index: 0
    }))
  }

  goBack = () => {
    this.props.navigation.pop()
  }

  render() {
    const { deck } = this.props
    const { index, score } = this.state

    if (index >= deck.questions.length) {
      return (
        <View style={styles.container}>
          <View style={styles.questionContainer}>
            <Text style={styles.question}>Score</Text>
            <Text style={styles.question}>{`${score}/${
              deck.questions.length
            }`}</Text>
          </View>
          <View style={styles.questionActions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: black }]}
              onPress={this.resetState}
            >
              <Text style={{ color: white }}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: black, marginTop: 20 }]}
              onPress={this.goBack}
            >
              <Text style={{ color: white }}>Back To Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, color: white }}>{`${index + 1}/${
          deck.questions.length
        }`}</Text>

        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            {this.state.flipped
              ? deck.questions[index].answer
              : deck.questions[index].question}
          </Text>
          <TouchableOpacity onPress={this.toggleFlip}>
            <Text style={styles.answerBtnText}>
              {this.state.flipped ? "Question" : "Answer"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.questionActions}>
          <TouchableOpacity
            style={[styles.button, styles.correctBtn]}
            onPress={() => this.handleAnswer(true)}
          >
            <Text style={{ color: white }}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.incorrectBtn]}
            onPress={() => this.handleAnswer(false)}
          >
            <Text style={{ color: white }}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

Quiz.propTypes = {
  deck: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  navigation: PropTypes.shape({
    pop: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = (decks, { navigation }) => ({
  deck: decks[navigation.state.params.title]
})

export default connect(mapStateToProps)(Quiz)
