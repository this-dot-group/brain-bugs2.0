import { Text, StyleSheet } from "react-native";
import { PixelButton, Hider } from "../../Shared";
import { connect } from "react-redux";
import { Typography, Buttons } from "../../../styles/index.js";

const AnswerTheme = ({ show, variation, children, screenDeviceWidth }) => {
  const styles = StyleSheet.create({
    answerButtonCont: {
      ...Buttons.answerThemeButtonCont,
    },
    selected: {
      ...Buttons.answerButtonSelected,
    },
    submitted: {
      ...Buttons.answerButtonSubmitted,
    },
    correct: {
      ...Buttons.answerButtonCorrect,
    },
    incorrect: {
      ...Buttons.answerButtonIncorrect,
    },
    "text-selected": {
      ...Typography.answerText[screenDeviceWidth],
    },
    "text-submitted": {
      ...Typography.answerText[screenDeviceWidth],
    },
    "text-correct": {
      ...Typography.answerTextDark[screenDeviceWidth],
    },
    "text-incorrect": {
      ...Typography.answerTextDark[screenDeviceWidth],
    },
  });

  return (
      <Hider show={show} style={styles.answerButtonCont} pointerEvents="none">
        <PixelButton buttonStyle={styles[variation]}>
          <Text style={styles[`text-${variation}`]}>{children}</Text>
        </PixelButton>
      </Hider>
  );
};

const mapStateToProps = (state) => ({
  screenDeviceWidth: state.userReducer.deviceWidth,
});

export default connect(mapStateToProps)(AnswerTheme);
