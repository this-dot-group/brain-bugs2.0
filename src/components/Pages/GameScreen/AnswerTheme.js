import { View, Text, StyleSheet } from "react-native";
import { PixelButton, Hider } from "../../Shared";
import { connect } from "react-redux";
import { Typography, Buttons } from "../../../styles/index.js";

const AnswerTheme = ({ show, variation, children, screenDeviceWidth }) => {
  const styles = StyleSheet.create({
    answerButtonCont: {
      position: "absolute",
      left: 0,
      top: 0,
    },
    selected: {
      ...Buttons.answerButtonSelected(screenDeviceWidth),
    },
    submitted: {
      ...Buttons.answerButtonSubmitted(screenDeviceWidth),
    },
    correct: {
      ...Buttons.answerButtonCorrect(screenDeviceWidth),
    },
    incorrect: {
      ...Buttons.answerButtonIncorrect(screenDeviceWidth),
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
    <View pointerEvents="none" style={styles.answerButtonCont}>
      <Hider show={show}>
        <PixelButton buttonStyle={styles[variation]}>
          <Text style={styles[`text-${variation}`]}>{children}</Text>
        </PixelButton>
      </Hider>
    </View>
  );
};

const mapStateToProps = (state) => ({
  screenDeviceWidth: state.userReducer.deviceWidth,
});

export default connect(mapStateToProps)(AnswerTheme);
